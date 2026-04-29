
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

describe("Modulo 4 - Calculos de venta", () => {

  // Test calculo de subtotal con varios productos
  it("calcularSubtotal debe sumar precio por cantidad de cada item", () => {
    const carrito = [
      { productoId: 1, cantidad: 2 },
      { productoId: 2, cantidad: 1 },
    ];
    const total = calcularSubtotal(carrito);
    expect(total).to.be.a("number");
    expect(total).to.be.at.least(0);
  });

  // Test cálculo subtotal con carrito vacio
  it("calcularSubtotal debe retornar 0 si el carrito esta vacio", () => {
    expect(calcularSubtotal([])).to.equal(0);
  });

  // Test calculo subtotal ignora productos que no existen
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

  // Test calculo de IVA
  it("aplicarIVA debe aplicar 19% sobre el monto", () => {
    expect(aplicarIVA(100000)).to.equal(19000);
  });

  // Test calculo de IVA con monto cero
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

  // Test tarjeta con numero invalido
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

  // Test tarjeta con cvv invalido
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

  // Test metodo inexistente
  it("validarMetodoPago debe rechazar metodos de pago no soportados", () => {
    expect(validarMetodoPago("bitcoin")).to.equal(false);
  });
});


describe("Modulo 4 - Sistema de cupones", () => {

  // Test cupon inexistente
  it("aplicarCupon debe rechazar un cupon que no existe", () => {
    const resultado = aplicarCupon("NOEXISTE", 1, 100000);
    expect(resultado.ok).to.equal(false);
    expect(resultado.descuento).to.equal(0);
  });

  // Test monto minimo no alcanzado
  it("aplicarCupon debe rechazar si el monto minimo no se alcanza", () => {
    const resultado = aplicarCupon("DESC10", 1, 1000);
    expect(resultado.ok).to.equal(false);
  });

  // Test cupon agotado (DESC20 tiene usos:50 y maxUsos:50)
  it("aplicarCupon debe rechazar un cupon agotado", () => {
    const resultado = aplicarCupon("DESC20", 1, 200000);
    expect(resultado.ok).to.equal(false);
  });

  // Test cupon restringido a usuarios especificos (VIP2024 solo permite [1,3,5])
  it("aplicarCupon debe rechazar si el usuario no esta autorizado", () => {
    const resultado = aplicarCupon("VIP2024", 99, 300000);
    expect(resultado.ok).to.equal(false);
  });
});


describe("Modulo 4 - Operaciones del carrito", () => {

  // Test agregar producto inexistente
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

describe("Modulo 4 - Checkout", () => {

  // Test checkout sin usuario
  it("checkoutCompra debe rechazar si el usuario no existe", () => {
    const resultado = checkoutCompra(9999, "efectivo", "Av Siempre Viva 123");
    expect(resultado.ok).to.equal(false);
  });

  // Test checkout con datos de tarjeta invalidos
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