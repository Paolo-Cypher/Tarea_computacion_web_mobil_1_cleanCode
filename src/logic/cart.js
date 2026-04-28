// ====================================================================
// src/logic/cart.js
// Modulo 4: Carrito y Ventas
// Refactoriza: addCart, checkout y cupon de la funcion orignal .js
// Lineas: 229-288;290-405;748-812
// Autor: Benjamin Farías
//=====================================================================

import { dbProducts as productos, dbUsers as users } from "../db/db.js";
import { coupons } from "../db/coupons.js";

//CONSTANTES
const IVA = 0.19; //19% de IVA

//Valore de 1 punto por cada peso gastado
const VALOR_PUNTOS = 1000; //1 punto vale 1000 pesos

//TABLA DE NIVELES DE DESCUENTOS POR PUNTOS
//Debe ir de mayor a menor para que funcione bien el .find() devuelva el primer match
const NIVELES_DESCUENTO = [
    { minPoints: 300, discount: 15 }, //platino: 15% de descuento para 300 o más puntos
    { minPoints: 200, discount: 10 }, //oro: 10% de descuento para 200 o más puntos
    { minPoints: 100, discount: 5 },  //plata: 5% de descuento para 100 o más puntos
    { minPoints: 0, discount: 0 }     //bronce: sin descuento para menos de 100 puntos
];

//VALIDACIONES POR METODO DE PAGO
const METODOS_PAGO = {
    tarjeta: (datos) => 
        datos?.numeroTargeta?.length === 16 && datos?.fechaExpiracion?.length === 4 && datos?.cvv?.length === 3,
    transferencia: () => true, //no requiere validacion adicional
    efectivo: () => true //no requiere validacion adicional
};

//FUCIONES PURAS DE CALCULO

//Calcula el subtotal del carrito sumando el precio por cantidad de cada producto
//Usa .reduce() para sumar y .find() para buscar el producto.
export const calcularSubtotal = (carrito) => 
    carrito.reduce((total, item) => {
        const producto = productos.find((p) => p.id === item.productoId);
        if (!producto) return total; //si el producto no existe, lo ignora
        return total + producto.prec * item.cantidad; //suma precio por cantidad
    }, 0);

//Devuelve el % de descuento segun los puntos de usuario
export const obtenerDescuentoPorPuntos = (puntos) => {
    const nivel = NIVELES_DESCUENTO.find((nivel) => puntos >= nivel.minPoints);
    return nivel ? nivel.discount : 0;
};


//Suma el descuento por nivel + descuento personal del usuario
//Devuelve el % total de descuento a aplicar
export const calcularDescuentoTotal = (usuario) => 
    obtenerDescuentoPorPuntos(usuario.puntos) + usuario.descuento;

//Aplica el IVA
export const aplicarIVA = (monto) => monto * IVA;

//CALCULA LOS PUNTOS QUE GANA EL USUARIO POR LA COMPRA (1 punto cada 1000 pesos gastados)
export const calcularPuntosGanados = (totalFinal) => Math.floor(totalFinal / VALOR_PUNTOS);

//Construye el detalle de productos param mostrar en la orden
//Cada item incluye: Nombre, Precio Unitario, Cantidad y Subtotal (precio x cantidad)
export const construirDetalleProductos = (carrito) => carrito.map((item) => {
        const producto = productos.find((p) => p.id === item.productoId);
        return {
            prod: producto.nom,
            cantidad: item.cantidad,
            precioUnit: producto.prec,
            subtotal: producto.prec * item.cantidad,
        };
    });

//FUNCIONES CON RESPECTO A CUPONES

//Valida y calculo el descuento de un cupón según su tipo
//Devuelve el monto a descontar o un mensaje de error si el cupón no es válido
export const aplicarCupon = (code, userId, carritoTotal) => {
    const cupon = coupons.find((c) => c.code === code);

    if (!cupon) return { ok: false, msg: "Cupón no encontrado", descuento: 0 };
    if (!cupon.activo) return { ok: false, msg: "Cupón no activo", descuento: 0 };
    if (new Date(cupon.expira) < new Date()) return { ok: false, msg: "Cupón expirado", descuento: 0 };
    if (cupon.usos >= cupon.maxUsos) return { ok: false, msg: "Cupón agotado", descuento: 0 };
    if (carritoTotal < cupon.minCompra) return { ok: false, msg: "Cupón no aplica para esta compra", descuento: 0 };

    //Si el cupon tiene restricciones de usuario
    if (cupon.usuarios && cupon.usuarios.length > 0 && !cupon.usuarios.includes(userId)) {
        return { ok: false, msg: "Cupón no válido para este usuario", descuento: 0 };
    }
    //Calcula el descuento según el tipo de cupón
    const calcularDescuento = {
        porcentaje: () => carritoTotal * (cupon.valor / 100),
        fijo: () => Math.min(cupon.valor, carritoTotal),
        envio: () => cupon.valor,
    };

    const descuento = (calcularDescuento[cupon.tipo] || (() => 0))();
    cupon.usos = (cupon.usos || 0) + 1;//incrementa el contador de usos del cupón

    return { ok: true, msg: "Cupón aplicado", descuento, tipo: cupon.tipo };
};

//CARRITO
//Agregar producto al carrito
//Usa Early returns para validar antes de agregar
export const agregarAlCarrito = (userId, productoId, cantidad) => {
    const producto = productos.find((p) => p.id === productoId);
    const usuario = users.find((u) => u.id === userId);

    //Validaciones con Early returns
    if (!producto) return { ok: false, msg: "Producto no encontrado", data: null };
    if (!producto.activo) return { ok: false, msg: "Producto no disponible", data: null };
    if (producto.stock < cantidad) return { ok: false, msg: "Stock insuficiente", data: null };
    if (!usuario) return { ok: false, msg: "Usuario no encontrado", data: null };

    //Si el producto ya está en el carrito, actualiza la cantidad; si no, lo agrega como nuevo item
    const itemEnCarrito = usuario.carrito.find((item) => item.productoId === productoId);
    if (itemEnCarrito) {
        itemEnCarrito.cantidad += cantidad;
    } else {
        usuario.carrito.push({ productoId, cantidad, addedAt: new Date() });
    }

    const subtotal = calcularSubtotal(usuario.carrito);

    return { ok: true, msg: "Producto agregado al carrito", data: { subtotal } };
};

//Vaciar Carrito
export const vaciarCarrito = (userId) => {
    const usuario = users.find((u) => u.id === userId);
    if (!usuario) return { ok: false, msg: "Usuario no encontrado" };
    usuario.carrito = [];
    return { ok: true, msg: "Carrito vaciado" };
};

//Checkout de Compra
export const validarMetodoPago = (metodoPago, datosPago) => {
    const metodo = METODOS_PAGO[metodoPago];
    if (!metodo) return false; //método de pago no reconocido
    return metodo(datosPago); //valida los datos según el método
};

//Descuenta el stock de los productos comprados según las cantidades en el carrito
export const actualizarStock = (carrito) => {
    carrito.forEach((item) => {
        const producto = productos.find((p) => p.id === item.productoId);
        if (producto) producto.stock -= item.cantidad; //descuenta la cantidad comprada del stock
    });
};

//PROCESA EL PAGO Y GENERA LA ORDEN DE COMPRA
//FLUJO:
//1. Valida usuario y carrito no vacío
//2. Calcula subtotal, total, IVA, aplica descuentos y puntos ganados
//3. Valida método de pago
//4. Crea orden, actualiza stocks, sumar puntos, vaciar carrito, guardar historial

export const checkoutCompra = (userId, metodoPago, direccion, datosPago = null) => {
    const usuario = users.find((u) => u.id === userId);

    //Validaciones con Early returns
    if (!usuario) return { ok: false, msg: "Usuario no encontrado", data: null };
    if (!usuario.carrito || usuario.carrito.length === 0) return { ok: false, msg: "Carrito vacío", data: null };
    if (!validarMetodoPago(metodoPago, datosPago)) return { ok: false, msg: "Método de pago no válido", data: null };

    const subtotal = calcularSubtotal(usuario.carrito);
    const itemsOrden = construirDetalleProductos(usuario.carrito);
    const descuentoPtc = calcularDescuentoTotal(usuario);
    const descuentoMonto = subtotal * (descuentoPtc / 100);
    const totalSinIVA = subtotal - descuentoMonto;
    const iva = aplicarIVA(totalSinIVA);
    const totalFinal = totalSinIVA + iva;
    const puntosGanados = calcularPuntosGanados(totalFinal);

    //Construye la orden
    const orden = {
        ID: `ORD-${Date.now()}`,//ID único basado en timestamp
        userId,
        items: itemsOrden,
        subtotal,
        descuentoPtc,
        descuentoMonto,
        totalSinIVA,
        iva,
        total: totalFinal,
        metodoPago,
        direccion,
        estado: "pagado",
        puntosGanados,
        createdAt: new Date(),//fecha de creación de la orden
    };

    //Side effects: actualizar el estado del sistema
    actualizarStock(usuario.carrito);//descuenta el stock de los productos comprados
    usuario.puntos = (usuario.puntos || 0) + puntosGanados;//suma los puntos ganados a los puntos actuales del usuario
    usuario.historial = usuario.historial || [];//inicializa el historial si no existe
    usuario.historial.push(orden);//guarda la orden en el historial del usuario
    usuario.carrito = [];//vacia el carrito después de la compra

    return { ok: true, msg: "Compra realizada con éxito", data: { orden } };
};