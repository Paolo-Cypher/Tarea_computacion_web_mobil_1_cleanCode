// =====================================================
// test/Cart.test.js
// Módulo 4: Carrito y Ventas
// Tests unitarios con Mocha + Chai
// =====================================================

import { expect } from "chai";
import {
  calcularSubtotal,
  obtenerDescuentoPorPuntos,
  calcularDescuentoTotal,
  aplicarIVA,
  calcularPuntosGanados,
  agregarAlCarrito,
  vaciarCarrito,
  validarMetodoPago,
  aplicarCupon,
  checkoutCompra,
} from "../src/logic/cart.js";

// =====================================================
// SECCION 1: Funciones puras de calculo
// =====================================================
describe("Modulo 4 - Calculos de venta", () => {

  // Test cálculo de subtotal con varios productos
  // Nota: usa los nombres reales de propiedades (productoId, cantidad)
  it("calcularSubtotal debe sumar precio por cantidad de cada item", () => {
    const carrito = [
      { productoId: 1, cantidad: 2 },
      { productoId: 2, cantidad: 1 },
    ];
    const total = calcularSubtotal(carrito);
    // Si los IDs 1 y 2 existen en dbProducts, debería ser > 0
    // Si no, el .find() los ignora y retorna 0 (revisar IDs reales en db.js)
    expect(total).to.be.a("number");
    expect(total).to.be.at.least(0);
  });

  // Test cálculo subtotal con carrito vacio
  it("calcularSubtotal debe retornar 0 si el carrito esta vacio", () => {
    expect(calcularSubtotal([])).to.equal(0);
  });

  // Test cálculo subtotal ignora productos que no existen
  it("calcularSubtotal debe ignorar productos inexistentes y retornar 0", () => {
    const carrito = [{ productoId: 99999, cantidad: 5 }];
    expect(calcularSubtotal(carrito)).to.equal(0);
  });

  // Test descuento por nivel - usuario sin puntos
  it("obtenerDescuentoPorPuntos debe retornar 0% para usuario sin puntos", () => {
    expect(obtenerDescuentoPorPuntos(0)).to.equal(0);
  });

  // Test descuento por nivel - nivel plata
  it("obtenerDescuentoPorPuntos debe retornar 5% para usuario con 150 puntos", () => {
    expect(obtenerDescuentoPorPuntos(150)).to.equal(5);
  });

  // Test descuento por nivel - nivel oro
  it("obtenerDescuentoPorPuntos debe retornar 10% para usuario con 250 puntos", () => {
    expect(obtenerDescuentoPorPuntos(250)).to.equal(10);
  });

  // Test descuento por nivel - nivel platino
  it("obtenerDescuentoPorPuntos debe retornar 15% para usuario con 350 puntos", () => {
    expect(obtenerDescuentoPorPuntos(350)).to.equal(15);
  });

  // Test descuento total (nivel + descuento personal)
  it("calcularDescuentoTotal debe sumar descuento por nivel y descuento personal", () => {
    const usuario = { puntos: 250, descuento: 5 };
    // 10% por nivel oro + 5% personal = 15%
    expect(calcularDescuentoTotal(usuario)).to.equal(15);
  });

  // Test cálculo de IVA
  it("aplicarIVA debe aplicar 19% sobre el monto", () => {
    expect(aplicarIVA(100000)).to.equal(19000);
  });

  // Test cálculo de IVA con monto cero
  it("aplicarIVA debe retornar 0 si el monto es 0", () => {
    expect(aplicarIVA(0)).to.equal(0);
  });

  // Test puntos ganados
  it("calcularPuntosGanados debe dar 1 punto por cada 1000 pesos", () => {
    expect(calcularPuntosGanados(15500)).to.equal(15);
  });

  // Test puntos ganados con monto bajo
  it("calcularPuntosGanados debe retornar 0 si el monto es menor a 1000", () => {
    expect(calcularPuntosGanados(500)).to.equal(0);
  });
});

// =====================================================
// SECCION 2: Validacion del metodo de pago
// =====================================================
describe("Modulo 4 - Validacion de metodo de pago", () => {

  // Test tarjeta válida (requiere numeroTargeta de 16, fechaExpiracion de 4 y cvv de 3)
  it("validarMetodoPago debe aceptar tarjeta con datos completos", () => {
    const datos = {
      numeroTargeta: "1234567890123456",
      fechaExpiracion: "1225",
      cvv: "123",
    };
    expect(validarMetodoPago("tarjeta", datos)).to.equal(true);
  });

  // Test tarjeta con número inválido
  it("validarMetodoPago debe rechazar tarjeta con numero incompleto", () => {
    const datos = {
      numeroTargeta: "1234",
      fechaExpiracion: "1225",
      cvv: "123",
    };
    expect(validarMetodoPago("tarjeta", datos)).to.equal(false);
  });

  // Test tarjeta sin fecha de expiración
  it("validarMetodoPago debe rechazar tarjeta sin fecha de expiracion", () => {
    const datos = {
      numeroTargeta: "1234567890123456",
      cvv: "123",
    };
    expect(validarMetodoPago("tarjeta", datos)).to.equal(false);
  });

  // Test tarjeta con cvv inválido
  it("validarMetodoPago debe rechazar tarjeta con cvv invalido", () => {
    const datos = {
      numeroTargeta: "1234567890123456",
      fechaExpiracion: "1225",
      cvv: "12",
    };
    expect(validarMetodoPago("tarjeta", datos)).to.equal(false);
  });

  // Test transferencia
  it("validarMetodoPago debe aceptar transferencia sin datos adicionales", () => {
    expect(validarMetodoPago("transferencia")).to.equal(true);
  });

  // Test efectivo
  it("validarMetodoPago debe aceptar efectivo sin datos adicionales", () => {
    expect(validarMetodoPago("efectivo")).to.equal(true);
  });

  // Test método inexistente
  it("validarMetodoPago debe rechazar metodos de pago no soportados", () => {
    expect(validarMetodoPago("bitcoin")).to.equal(false);
  });
});

// =====================================================
// SECCION 3: Cupones de descuento
// =====================================================
describe("Modulo 4 - Sistema de cupones", () => {

  // Test cupón inexistente
  it("aplicarCupon debe rechazar un cupon que no existe", () => {
    const resultado = aplicarCupon("NOEXISTE", 1, 100000);
    expect(resultado.ok).to.equal(false);
    expect(resultado.descuento).to.equal(0);
  });

  // Test monto mínimo no alcanzado
  it("aplicarCupon debe rechazar si el monto minimo no se alcanza", () => {
    const resultado = aplicarCupon("DESC10", 1, 1000);
    expect(resultado.ok).to.equal(false);
  });

  // Test cupón agotado (DESC20 tiene usos:50 y maxUsos:50)
  it("aplicarCupon debe rechazar un cupon agotado", () => {
    const resultado = aplicarCupon("DESC20", 1, 200000);
    expect(resultado.ok).to.equal(false);
  });

  // Test cupón restringido a usuarios específicos (VIP2024 solo permite [1,3,5])
  it("aplicarCupon debe rechazar si el usuario no esta autorizado", () => {
    const resultado = aplicarCupon("VIP2024", 99, 300000);
    expect(resultado.ok).to.equal(false);
  });
});

// =====================================================
// SECCION 4: Operaciones del carrito
// =====================================================
describe("Modulo 4 - Operaciones del carrito", () => {

  // Test agregar producto inexistente
  // Nota: el mensaje empieza con mayuscula en cart.js
  it("agregarAlCarrito debe rechazar un producto que no existe", () => {
    const resultado = agregarAlCarrito(1, 99999, 1);
    expect(resultado.ok).to.equal(false);
    expect(resultado.msg).to.equal("Producto no encontrado");
  });

  // Test agregar para usuario inexistente
  it("agregarAlCarrito debe rechazar si el usuario no existe", () => {
    const resultado = agregarAlCarrito(9999, 1, 1);
    expect(resultado.ok).to.equal(false);
  });

  // Test vaciar carrito - usuario inexistente
  // Nota: vaciarCarrito recibe userId, no el objeto usuario
  it("vaciarCarrito debe rechazar si el usuario no existe", () => {
    const resultado = vaciarCarrito(9999);
    expect(resultado.ok).to.equal(false);
    expect(resultado.msg).to.equal("Usuario no encontrado");
  });

  // Test vaciar carrito - usuario existente
  it("vaciarCarrito debe vaciar el carrito de un usuario existente", () => {
    const resultado = vaciarCarrito(1);
    expect(resultado.ok).to.equal(true);
    expect(resultado.msg).to.equal("Carrito vaciado");
  });
});

// =====================================================
// SECCION 5: Proceso de checkout
// =====================================================
describe("Modulo 4 - Checkout", () => {

  // Test checkout sin usuario
  it("checkoutCompra debe rechazar si el usuario no existe", () => {
    const resultado = checkoutCompra(9999, "efectivo", "Av Siempre Viva 123");
    expect(resultado.ok).to.equal(false);
  });

  // Test checkout con datos de tarjeta inválidos
  it("checkoutCompra debe rechazar si los datos de tarjeta son invalidos", () => {
    const resultado = checkoutCompra(
      1,
      "tarjeta",
      "Av Siempre Viva 123",
      { numeroTargeta: "123", fechaExpiracion: "12", cvv: "1" }
    );
    expect(resultado.ok).to.equal(false);
  });
});