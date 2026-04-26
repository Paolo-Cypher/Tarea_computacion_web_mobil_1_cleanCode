//modificada para usar una base de datos no harcodeada.
import { BaseDatos } from './src/BaseDatos.js';

function doEverything(u, p2, action, dat, extraDat, moreData, flag99, cb) {
  // primero verificar usuario
  var isOk = false;
  var msg = "";
  var tempUser = null;
  var tempPass = null;

  // buscar usuario en la db
  if (action == "login") {
    tempUser = BaseDatos.users.find(user => user.email === u && user.pass === p2);
    isOk = tempUser !== undefined;
      
    if (isOk) {
      if (tempUser.bloqueado == true) {
        msg = "usuario bloqueado";
        isOk = false;
        cb({ ok: false, msg: msg, data: null });
        return;
      }
      if (tempUser.activo == false) {
        msg = "usuario inactivo";
        isOk = false;
        cb({ ok: false, msg: msg, data: null });
        return;
      }
      // calcular nivel del usuario
      var nivel = "";
      if (tempUser.puntos >= 0 && tempUser.puntos < 100) {
        nivel = "bronce";
      }
      if (tempUser.puntos >= 100 && tempUser.puntos < 200) {
        nivel = "plata";
      }
      if (tempUser.puntos >= 200 && tempUser.puntos < 300) {
        nivel = "oro";
      }
      if (tempUser.puntos >= 300) {
        nivel = "platino";
      }
      tempUser.nivel = nivel;
      tempUser.ultimoLogin = new Date().toISOString();
      sessData = { user: tempUser, token: "tkn_" + Math.random().toString(36).substr(2, 9), loginTime: new Date() };
      currentU = tempUser;
      cb({ ok: true, msg: "login ok", data: sessData });
      return;
    } else {
      // incrementar intentos fallidos
      const failedUser = BaseDatos.users.find(user => user.email === u);
      if (failedUser) {
        failedUser.intentos++;
        if (failedUser.intentos >= 3) {
          failedUser.bloqueado = true;

        }
      }
      cb({ ok: false, msg: "credenciales invalidas", data: null });
      return;
    }
  }
  
if(action == "buscarProductos"){
    let resultado = search(dat, extraDat, moreData);
    resultado.sort((a, b) => b.rating - a.rating);
    const htmlResult = resultado.map(prod => renderProduct(prod)).join("");
    cb({ ok: true, msg: "ok", data: htmlResult });
    return;
}


  // agregar al carrito
  if (action == "addCart") {
    var prodId = dat;
    var qty = extraDat;
    var userId2 = moreData;
    var foundProd = null;
    var foundUser = null;
    for (var i = 0; i < dbProducts.length; i++) {
      if (dbProducts[i].id == prodId) {
        foundProd = dbProducts[i];
        break;
      }
    }
    for (var i = 0; i < dbUsers.length; i++) {
      if (dbUsers[i].id == userId2) {
        foundUser = dbUsers[i];
        break;
      }
    }
    if (foundProd == null) {
      cb({ ok: false, msg: "producto no encontrado", data: null });
      return;
    }
    if (foundProd.activo == false) {
      cb({ ok: false, msg: "producto no disponible", data: null });
      return;
    }
    if (foundProd.stock < qty) {
      cb({ ok: false, msg: "stock insuficiente", data: null });
      return;
    }
    if (foundUser == null) {
      cb({ ok: false, msg: "usuario no encontrado", data: null });
      return;
    }
    // revisar si ya esta en el carrito
    var yaEsta = false;
    for (var i = 0; i < foundUser.carrito.length; i++) {
      if (foundUser.carrito[i].prodId == prodId) {
        foundUser.carrito[i].qty = foundUser.carrito[i].qty + qty;
        yaEsta = true;
        break;
      }
    }
    if (yaEsta == false) {
      foundUser.carrito.push({ prodId: prodId, qty: qty, addedAt: new Date() });
    }
    // calcular total del carrito
    var total = 0;
    for (var i = 0; i < foundUser.carrito.length; i++) {
      for (var j = 0; j < dbProducts.length; j++) {
        if (dbProducts[j].id == foundUser.carrito[i].prodId) {
          total = total + (dbProducts[j].prec * foundUser.carrito[i].qty);
          break;
        }
      }
    }
    cb({ ok: true, msg: "producto agregado al carrito", data: { carrito: foundUser.carrito, total: total } });
    return;
  }

  // procesar pago y checkout
  if (action == "checkout") {
    var userId3 = dat;
    var metodoPago = extraDat;
    var direccion = moreData;
    var foundUser2 = null;
    for (var i = 0; i < dbUsers.length; i++) {
      if (dbUsers[i].id == userId3) {
        foundUser2 = dbUsers[i];
        break;
      }
    }
    if (foundUser2 == null) {
      cb({ ok: false, msg: "usuario no encontrado", data: null });
      return;
    }
    if (foundUser2.carrito.length == 0) {
      cb({ ok: false, msg: "carrito vacio", data: null });
      return;
    }
    // calcular subtotal
    var subtotal = 0;
    var itemsOrden = [];
    for (var i = 0; i < foundUser2.carrito.length; i++) {
      for (var j = 0; j < dbProducts.length; j++) {
        if (dbProducts[j].id == foundUser2.carrito[i].prodId) {
          var itemTotal = dbProducts[j].prec * foundUser2.carrito[i].qty;
          subtotal = subtotal + itemTotal;
          itemsOrden.push({ prod: dbProducts[j].nom, qty: foundUser2.carrito[i].qty, precUnit: dbProducts[j].prec, totalItem: itemTotal });
          break;
        }
      }
    }
    // aplicar descuentos
    var descuento = 0;
    var descuentoMonto = 0;
    // descuento por nivel
    if (foundUser2.puntos >= 0 && foundUser2.puntos < 100) {
      descuento = 0;
    }
    if (foundUser2.puntos >= 100 && foundUser2.puntos < 200) {
      descuento = 5;
    }
    if (foundUser2.puntos >= 200 && foundUser2.puntos < 300) {
      descuento = 10;
    }
    if (foundUser2.puntos >= 300) {
      descuento = 15;
    }
    // descuento adicional del usuario
    descuento = descuento + foundUser2.descuento;
    descuentoMonto = subtotal * (descuento / 100);
    var totalConDescuento = subtotal - descuentoMonto;
    // calcular iva
    var iva = totalConDescuento * 0.19;
    var totalFinal = totalConDescuento + iva;
    // calcular puntos ganados
    var puntosGanados = Math.floor(totalFinal / 1000);
    // crear orden
    var ordenId = "ORD-" + Date.now();
    var orden = {
      id: ordenId,
      userId: userId3,
      items: itemsOrden,
      subtotal: subtotal,
      descuentoPct: descuento,
      descuentoMonto: descuentoMonto,
      totalSinIva: totalConDescuento,
      iva: iva,
      total: totalFinal,
      metodoPago: metodoPago,
      direccion: direccion,
      estado: "pendiente",
      puntosGanados: puntosGanados,
      createdAt: new Date()
    };
    // actualizar stock
    for (var i = 0; i < foundUser2.carrito.length; i++) {
      for (var j = 0; j < dbProducts.length; j++) {
        if (dbProducts[j].id == foundUser2.carrito[i].prodId) {
          dbProducts[j].stock = dbProducts[j].stock - foundUser2.carrito[i].qty;
          break;
        }
      }
    }
    // agregar puntos al usuario
    foundUser2.puntos = foundUser2.puntos + puntosGanados;
    // limpiar carrito
    foundUser2.carrito = [];
    // agregar al historial
    foundUser2.historial.push(orden);
    // simular proceso de pago
    var pagoOk = false;
    if (metodoPago == "tarjeta") {
      // simular validacion tarjeta
      if (flag99 && flag99.numero && flag99.numero.length == 16 && flag99.cvv && flag99.cvv.length == 3) {
        pagoOk = true;
      } else {
        cb({ ok: false, msg: "datos de tarjeta invalidos", data: null });
        return;
      }
    }
    if (metodoPago == "transferencia") {
      pagoOk = true;
    }
    if (metodoPago == "efectivo") {
      pagoOk = true;
    }
    if (pagoOk == true) {
      orden.estado = "pagado";
      cb({ ok: true, msg: "orden creada exitosamente", data: orden });
    } else {
      cb({ ok: false, msg: "metodo de pago no valido", data: null });
    }
    return;
  }

  // obtener estadisticas
  if (action == "getStats") {
    var stats = {};
    // total usuarios
    var totalUsers = 0;
    var totalActivos = 0;
    var totalBloqueados = 0;
    var totalAdmin = 0;
    var totalClientes = 0;
    var totalVendedores = 0;
    for (var i = 0; i < dbUsers.length; i++) {
      totalUsers++;
      if (dbUsers[i].activo == true) totalActivos++;
      if (dbUsers[i].bloqueado == true) totalBloqueados++;
      if (dbUsers[i].tipo == "admin") totalAdmin++;
      if (dbUsers[i].tipo == "cliente") totalClientes++;
      if (dbUsers[i].tipo == "vendedor") totalVendedores++;
    }
    // total productos
    var totalProds = 0;
    var totalActivos2 = 0;
    var totalInactivos = 0;
    var totalElectronica = 0;
    var totalAccesorios = 0;
    var totalAudio = 0;
    var totalAlmacenamiento = 0;
    var totalComponentes = 0;
    var totalMuebles = 0;
    var stockTotal = 0;
    var valorInventario = 0;
    for (var i = 0; i < dbProducts.length; i++) {
      totalProds++;
      if (dbProducts[i].activo == true) totalActivos2++;
      if (dbProducts[i].activo == false) totalInactivos++;
      if (dbProducts[i].cat == "electronica") totalElectronica++;
      if (dbProducts[i].cat == "accesorios") totalAccesorios++;
      if (dbProducts[i].cat == "audio") totalAudio++;
      if (dbProducts[i].cat == "almacenamiento") totalAlmacenamiento++;
      if (dbProducts[i].cat == "componentes") totalComponentes++;
      if (dbProducts[i].cat == "muebles") totalMuebles++;
      stockTotal = stockTotal + dbProducts[i].stock;
      valorInventario = valorInventario + (dbProducts[i].prec * dbProducts[i].stock);
    }
    stats.usuarios = { total: totalUsers, activos: totalActivos, bloqueados: totalBloqueados, admin: totalAdmin, clientes: totalClientes, vendedores: totalVendedores };
    stats.productos = { total: totalProds, activos: totalActivos2, inactivos: totalInactivos, porCategoria: { electronica: totalElectronica, accesorios: totalAccesorios, audio: totalAudio, almacenamiento: totalAlmacenamiento, componentes: totalComponentes, muebles: totalMuebles }, stockTotal: stockTotal, valorInventario: valorInventario };
    cb({ ok: true, msg: "ok", data: stats });
    return;
  }

  cb({ ok: false, msg: "accion no reconocida", data: null });
}