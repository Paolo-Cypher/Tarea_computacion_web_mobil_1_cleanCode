// sistema de gestion de tienda online
// hecho por: juan
// fecha: no se
// version: final_v2_BUENO_este_si

var x = [];
var x2 = [];
var x3 = [];
var DESCUENTO = 10;
var DESCUENTO2 = 20;
var DESCUENTO3 = 5;
var flag = false;
var flag2 = false;
var flag3 = false;
var temp = null;
var temp2 = null;
var temp3 = null;
var c = 0;
var c2 = 0;
var c3 = 0;
var DATA = [];
var DATA2 = [];
var DATA3 = [];
var myList = [];
var myList2 = [];
var myList3 = [];
var result;
var result2;
var result3;
var n = 0;
var nn = 0;
var nnn = 0;
var nnnn = 0;
var aux;
var aux2;
var aux3;
var ok = false;
var ok2 = false;
var ok3 = false;
var theUser;
var theUser2;
var currentU;
var sessData;
var cartThing;
var cartThing2;
var myCart = [];
var myCart2 = [];
var totalVar = 0;
var totalVar2 = 0;
var totalVar3 = 0;
var p = 0;
var pp = 0;
var ppp = 0;
var i = 0;
var ii = 0;
var iii = 0;
var j = 0;
var jj = 0;
var jjj = 0;
var k = 0;
var q = null;
var q2 = null;
var q3 = null;
var response;
var response2;
var response3;
var err;
var err2;
var err3;
var d = new Date();
var d2;
var d3;
var str1 = "";
var str2 = "";
var str3 = "";
var bool1;
var bool2;
var bool3;
var num1 = 0;
var num2 = 0;
var num3 = 0;
var arr = [];
var arr2 = [];
var arr3 = [];
var obj = {};
var obj2 = {};
var obj3 = {};
var a, b, cc, dd, ee, ff, gg, hh, ii2, jj2;

// =====================================
// funcion principal que hace todo
// =====================================
function doEverything(u, p2, action, dat, extraDat, moreData, flag99, cb) {
  // primero verificar usuario
  var isOk = false;
  var msg = "";
  var tempUser = null;
  var tempPass = null;
  var dbUsers = [
    { id: 1, nombre: "Juan Perez", email: "juan@mail.com", pass: "1234", tipo: "admin", puntos: 150, descuento: 0, historial: [], carrito: [], wishlist: [], direcciones: [], metodoPago: [], activo: true, intentos: 0, bloqueado: false, ultimoLogin: null, createdAt: "2023-01-01", updatedAt: "2023-06-01" },
    { id: 2, nombre: "Maria Lopez", email: "maria@mail.com", pass: "abcd", tipo: "cliente", puntos: 80, descuento: 5, historial: [], carrito: [], wishlist: [], direcciones: [], metodoPago: [], activo: true, intentos: 0, bloqueado: false, ultimoLogin: null, createdAt: "2023-02-01", updatedAt: "2023-06-15" },
    { id: 3, nombre: "Pedro Gonzalez", email: "pedro@mail.com", pass: "pass123", tipo: "vendedor", puntos: 200, descuento: 10, historial: [], carrito: [], wishlist: [], direcciones: [], metodoPago: [], activo: true, intentos: 0, bloqueado: false, ultimoLogin: null, createdAt: "2023-03-01", updatedAt: "2023-07-01" },
    { id: 4, nombre: "Ana Martinez", email: "ana@mail.com", pass: "ana2024", tipo: "cliente", puntos: 50, descuento: 0, historial: [], carrito: [], wishlist: [], direcciones: [], metodoPago: [], activo: false, intentos: 3, bloqueado: true, ultimoLogin: null, createdAt: "2023-04-01", updatedAt: "2023-07-10" },
    { id: 5, nombre: "Carlos Ruiz", email: "carlos@mail.com", pass: "carlos99", tipo: "cliente", puntos: 300, descuento: 15, historial: [], carrito: [], wishlist: [], direcciones: [], metodoPago: [], activo: true, intentos: 0, bloqueado: false, ultimoLogin: null, createdAt: "2023-05-01", updatedAt: "2023-08-01" }
  ];
  var dbProducts = [
    { id: 101, nom: "Laptop Pro 15", cat: "electronica", prec: 1200000, stock: 5, desc: "Laptop de alto rendimiento", rating: 4.5, reviews: [], vendedor: 3, imgs: ["img1.jpg", "img2.jpg"], tags: ["laptop", "computador", "pro"], activo: true, createdAt: "2023-01-15" },
    { id: 102, nom: "Mouse Inalambrico", cat: "accesorios", prec: 25000, stock: 50, desc: "Mouse ergonomico inalambrico", rating: 4.0, reviews: [], vendedor: 3, imgs: ["img3.jpg"], tags: ["mouse", "inalambrico"], activo: true, createdAt: "2023-01-20" },
    { id: 103, nom: "Teclado Mecanico RGB", cat: "accesorios", prec: 85000, stock: 20, desc: "Teclado mecanico con iluminacion RGB", rating: 4.8, reviews: [], vendedor: 3, imgs: ["img4.jpg", "img5.jpg"], tags: ["teclado", "mecanico", "rgb"], activo: true, createdAt: "2023-02-01" },
    { id: 104, nom: "Monitor 4K 27\"", cat: "electronica", prec: 450000, stock: 8, desc: "Monitor 4K con HDR", rating: 4.6, reviews: [], vendedor: 3, imgs: ["img6.jpg"], tags: ["monitor", "4k"], activo: true, createdAt: "2023-02-15" },
    { id: 105, nom: "Auriculares Bluetooth", cat: "audio", prec: 75000, stock: 30, desc: "Auriculares con cancelacion de ruido", rating: 4.3, reviews: [], vendedor: 3, imgs: ["img7.jpg"], tags: ["auriculares", "bluetooth"], activo: true, createdAt: "2023-03-01" },
    { id: 106, nom: "Webcam HD 1080p", cat: "accesorios", prec: 45000, stock: 15, desc: "Webcam para videoconferencias", rating: 4.1, reviews: [], vendedor: 3, imgs: ["img8.jpg"], tags: ["webcam", "camara"], activo: true, createdAt: "2023-03-15" },
    { id: 107, nom: "SSD 1TB", cat: "almacenamiento", prec: 95000, stock: 25, desc: "SSD de alta velocidad", rating: 4.7, reviews: [], vendedor: 3, imgs: ["img9.jpg"], tags: ["ssd", "almacenamiento"], activo: true, createdAt: "2023-04-01" },
    { id: 108, nom: "Memoria RAM 16GB", cat: "componentes", prec: 65000, stock: 40, desc: "RAM DDR4 3200MHz", rating: 4.4, reviews: [], vendedor: 3, imgs: ["img10.jpg"], tags: ["ram", "memoria"], activo: true, createdAt: "2023-04-15" },
    { id: 109, nom: "Silla Gamer", cat: "muebles", prec: 350000, stock: 10, desc: "Silla ergonomica para gaming", rating: 4.2, reviews: [], vendedor: 3, imgs: ["img11.jpg"], tags: ["silla", "gamer"], activo: false, createdAt: "2023-05-01" },
    { id: 110, nom: "Hub USB-C 7 en 1", cat: "accesorios", prec: 38000, stock: 60, desc: "Hub multipuerto USB-C", rating: 3.9, reviews: [], vendedor: 3, imgs: ["img12.jpg"], tags: ["hub", "usb"], activo: true, createdAt: "2023-05-15" }
  ];

  // buscar usuario en la db
  if (action == "login") {
    for (var i = 0; i < dbUsers.length; i++) {
      if (dbUsers[i].email == u && dbUsers[i].pass == p2) {
        isOk = true;
        tempUser = dbUsers[i];
        break;
      }
    }
    if (isOk == true) {
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
      for (var i = 0; i < dbUsers.length; i++) {
        if (dbUsers[i].email == u) {
          dbUsers[i].intentos++;
          if (dbUsers[i].intentos >= 3) {
            dbUsers[i].bloqueado = true;
          }
          break;
        }
      }
      cb({ ok: false, msg: "credenciales invalidas", data: null });
      return;
    }
  }

  // buscar productos
  if (action == "buscarProductos") {
    var query = dat;
    var cat = extraDat;
    var minP = moreData ? moreData.min : 0;
    var maxP = moreData ? moreData.max : 999999999;
    var res = [];
    for (var i = 0; i < dbProducts.length; i++) {
      var prod = dbProducts[i];
      var match = false;
      if (prod.activo == false) continue;
      if (query && query != "" && query != null && query != undefined) {
        if (prod.nom.toLowerCase().indexOf(query.toLowerCase()) != -1) {
          match = true;
        }
        if (prod.desc.toLowerCase().indexOf(query.toLowerCase()) != -1) {
          match = true;
        }
        for (var j = 0; j < prod.tags.length; j++) {
          if (prod.tags[j].toLowerCase().indexOf(query.toLowerCase()) != -1) {
            match = true;
          }
        }
      } else {
        match = true;
      }
      if (cat && cat != "" && cat != null && cat != undefined) {
        if (prod.cat != cat) {
          match = false;
        }
      }
      if (prod.prec < minP || prod.prec > maxP) {
        match = false;
      }
      if (match == true) {
        res.push(prod);
      }
    }
    // ordenar por rating
    for (var i = 0; i < res.length - 1; i++) {
      for (var j = 0; j < res.length - i - 1; j++) {
        if (res[j].rating < res[j + 1].rating) {
          var tmp = res[j];
          res[j] = res[j + 1];
          res[j + 1] = tmp;
        }
      }
    }
    cb({ ok: true, msg: "ok", data: res });
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

// =====================================
// mas funciones con malas practicas
// =====================================

// funcion para validar TODO
function v(cosa, tipo) {
  var r = false;
  if (tipo == 1) {
    // validar email
    if (cosa != null && cosa != undefined && cosa != "" && cosa.indexOf("@") != -1 && cosa.indexOf(".") != -1) {
      r = true;
    }
  }
  if (tipo == 2) {
    // validar pass
    if (cosa != null && cosa != undefined && cosa.length >= 4) {
      r = true;
    }
  }
  if (tipo == 3) {
    // validar numero
    if (cosa != null && cosa != undefined && !isNaN(cosa) && cosa > 0) {
      r = true;
    }
  }
  if (tipo == 4) {
    // validar string
    if (cosa != null && cosa != undefined && cosa != "" && typeof cosa == "string") {
      r = true;
    }
  }
  if (tipo == 5) {
    // validar array
    if (cosa != null && cosa != undefined && Array.isArray(cosa) && cosa.length > 0) {
      r = true;
    }
  }
  if (tipo == 6) {
    // validar objeto
    if (cosa != null && cosa != undefined && typeof cosa == "object" && Object.keys(cosa).length > 0) {
      r = true;
    }
  }
  if (tipo == 7) {
    // validar fecha
    if (cosa != null && cosa != undefined) {
      var dd2 = new Date(cosa);
      if (!isNaN(dd2.getTime())) {
        r = true;
      }
    }
  }
  if (tipo == 8) {
    // validar rut chileno (super basico)
    if (cosa != null && cosa != undefined && cosa != "" && cosa.length >= 8 && cosa.indexOf("-") != -1) {
      r = true;
    }
  }
  return r;
}

// calcular precio con todo
function calc(p, d, d2, d3, iva, envio, cuotas) {
  // p = precio base
  // d = descuento nivel
  // d2 = descuento cupon
  // d3 = descuento especial
  // iva = si aplica iva
  // envio = costo envio
  // cuotas = numero cuotas
  var r = 0;
  var r2 = 0;
  var r3 = 0;
  var r4 = 0;
  var r5 = 0;
  var r6 = 0;
  var r7 = 0;
  r = p;
  if (d > 0) {
    r2 = r * (d / 100);
    r = r - r2;
  }
  if (d2 > 0) {
    r3 = r * (d2 / 100);
    r = r - r3;
  }
  if (d3 > 0) {
    r4 = r * (d3 / 100);
    r = r - r4;
  }
  if (iva == true) {
    r5 = r * 0.19;
    r = r + r5;
  }
  if (envio > 0) {
    r = r + envio;
  }
  r6 = r;
  if (cuotas > 1) {
    // agregar interes segun cuotas
    if (cuotas == 2) {
      r7 = r * 0.02;
      r = r + r7;
    }
    if (cuotas == 3) {
      r7 = r * 0.04;
      r = r + r7;
    }
    if (cuotas == 6) {
      r7 = r * 0.08;
      r = r + r7;
    }
    if (cuotas == 12) {
      r7 = r * 0.15;
      r = r + r7;
    }
    if (cuotas == 24) {
      r7 = r * 0.28;
      r = r + r7;
    }
    if (cuotas == 36) {
      r7 = r * 0.45;
      r = r + r7;
    }
  }
  return {
    base: p,
    dscto1: r2,
    dscto2: r3,
    dscto3: r4,
    subtotal: r6,
    iva: r5,
    envio: envio,
    totalCuota: cuotas > 1 ? r / cuotas : r,
    total: r
  };
}

// funcion de reporte
function makeReport(type, from, to, data, data2, data3, opts) {
  var report = "";
  var lines = [];
  var totalGeneral = 0;
  var totalGeneral2 = 0;
  var totalGeneral3 = 0;
  var count = 0;
  var count2 = 0;
  var count3 = 0;
  var avg = 0;
  var avg2 = 0;
  var avg3 = 0;
  var max = 0;
  var max2 = 0;
  var max3 = 0;
  var min = 999999999;
  var min2 = 999999999;
  var min3 = 999999999;
  
  if (type == "ventas") {
    report += "=== REPORTE DE VENTAS ===\n";
    report += "Desde: " + from + "\n";
    report += "Hasta: " + to + "\n";
    report += "========================\n";
    for (var i = 0; i < data.length; i++) {
      var venta = data[i];
      totalGeneral = totalGeneral + venta.total;
      count++;
      if (venta.total > max) max = venta.total;
      if (venta.total < min) min = venta.total;
      lines.push("Orden: " + venta.id + " | Total: $" + venta.total + " | Estado: " + venta.estado);
    }
    avg = count > 0 ? totalGeneral / count : 0;
    report += lines.join("\n");
    report += "\n------------------------\n";
    report += "Total ordenes: " + count + "\n";
    report += "Total ingresos: $" + totalGeneral + "\n";
    report += "Promedio por orden: $" + avg + "\n";
    report += "Venta maxima: $" + max + "\n";
    report += "Venta minima: $" + min + "\n";
  }
  if (type == "productos") {
    report += "=== REPORTE DE PRODUCTOS ===\n";
    report += "Desde: " + from + "\n";
    report += "Hasta: " + to + "\n";
    report += "============================\n";
    for (var i = 0; i < data.length; i++) {
      var prod2 = data[i];
      totalGeneral2 = totalGeneral2 + prod2.prec;
      count2++;
      if (prod2.prec > max2) max2 = prod2.prec;
      if (prod2.prec < min2) min2 = prod2.prec;
      lines.push("Producto: " + prod2.nom + " | Precio: $" + prod2.prec + " | Stock: " + prod2.stock + " | Rating: " + prod2.rating);
    }
    avg2 = count2 > 0 ? totalGeneral2 / count2 : 0;
    report += lines.join("\n");
    report += "\n----------------------------\n";
    report += "Total productos: " + count2 + "\n";
    report += "Precio promedio: $" + avg2 + "\n";
    report += "Precio maximo: $" + max2 + "\n";
    report += "Precio minimo: $" + min2 + "\n";
  }
  if (type == "usuarios") {
    report += "=== REPORTE DE USUARIOS ===\n";
    report += "Desde: " + from + "\n";
    report += "Hasta: " + to + "\n";
    report += "===========================\n";
    for (var i = 0; i < data.length; i++) {
      var usr2 = data[i];
      totalGeneral3 = totalGeneral3 + usr2.puntos;
      count3++;
      if (usr2.puntos > max3) max3 = usr2.puntos;
      if (usr2.puntos < min3) min3 = usr2.puntos;
      lines.push("Usuario: " + usr2.nombre + " | Email: " + usr2.email + " | Tipo: " + usr2.tipo + " | Puntos: " + usr2.puntos + " | Activo: " + usr2.activo);
    }
    avg3 = count3 > 0 ? totalGeneral3 / count3 : 0;
    report += lines.join("\n");
    report += "\n---------------------------\n";
    report += "Total usuarios: " + count3 + "\n";
    report += "Puntos promedio: " + avg3 + "\n";
    report += "Max puntos: " + max3 + "\n";
    report += "Min puntos: " + min3 + "\n";
  }
  return report;
}

// funcion para notificaciones (completamente duplicada en logica)
function sendNotif(tipo, userId, msg, data) {
  var n = {};
  var sent = false;
  if (tipo == "email") {
    // simular envio email
    console.log("Enviando email a usuario " + userId + ": " + msg);
    n = { tipo: "email", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (tipo == "sms") {
    // simular envio sms
    console.log("Enviando SMS a usuario " + userId + ": " + msg);
    n = { tipo: "sms", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (tipo == "push") {
    // simular push notification
    console.log("Enviando push a usuario " + userId + ": " + msg);
    n = { tipo: "push", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (tipo == "inapp") {
    // simular notificacion interna
    console.log("Guardando notif inapp para usuario " + userId + ": " + msg);
    n = { tipo: "inapp", userId: userId, msg: msg, data: data, sentAt: new Date(), ok: true };
    sent = true;
  }
  if (sent == false) {
    n = { tipo: tipo, userId: userId, msg: msg, data: data, sentAt: new Date(), ok: false, err: "tipo no reconocido" };
  }
  return n;
}

// otra funcion para enviar notificacion (duplicado casi identico)
function notifyUser(channel, uid, message, payload) {
  var notif = {};
  var wasSent = false;
  if (channel == "email") {
    console.log("Enviando email a usuario " + uid + ": " + message);
    notif = { channel: "email", uid: uid, message: message, payload: payload, timestamp: new Date(), success: true };
    wasSent = true;
  }
  if (channel == "sms") {
    console.log("Enviando SMS a usuario " + uid + ": " + message);
    notif = { channel: "sms", uid: uid, message: message, payload: payload, timestamp: new Date(), success: true };
    wasSent = true;
  }
  if (channel == "push") {
    console.log("Enviando push a usuario " + uid + ": " + message);
    notif = { channel: "push", uid: uid, message: message, payload: payload, timestamp: new Date(), success: true };
    wasSent = true;
  }
  if (channel == "inapp") {
    console.log("Guardando notif para usuario " + uid + ": " + message);
    notif = { channel: "inapp", uid: uid, message: message, payload: payload, timestamp: new Date(), success: true };
    wasSent = true;
  }
  if (wasSent == false) {
    notif = { channel: channel, uid: uid, message: message, payload: payload, timestamp: new Date(), success: false, error: "canal no valido" };
  }
  return notif;
}

// manejo de cupones
function cupon(code, userId, cartTotal, products) {
  // lista de cupones hardcodeada
  var cupones = [
    { code: "DESC10", tipo: "porcentaje", valor: 10, minCompra: 50000, maxUsos: 100, usos: 45, activo: true, expira: "2024-12-31", categorias: [], usuarios: [] },
    { code: "DESC20", tipo: "porcentaje", valor: 20, minCompra: 100000, maxUsos: 50, usos: 50, activo: true, expira: "2024-06-30", categorias: ["electronica"], usuarios: [] },
    { code: "ENVGRATIS", tipo: "envio", valor: 100, minCompra: 30000, maxUsos: 200, usos: 180, activo: true, expira: "2024-12-31", categorias: [], usuarios: [] },
    { code: "BIENVENIDO", tipo: "fijo", valor: 5000, minCompra: 20000, maxUsos: 1000, usos: 523, activo: true, expira: "2025-12-31", categorias: [], usuarios: [] },
    { code: "VIP2024", tipo: "porcentaje", valor: 25, minCompra: 200000, maxUsos: 20, usos: 15, activo: true, expira: "2024-12-31", categorias: [], usuarios: [1, 3, 5] }
  ];
  var found = null;
  for (var i = 0; i < cupones.length; i++) {
    if (cupones[i].code == code) {
      found = cupones[i];
      break;
    }
  }
  if (found == null) {
    return { ok: false, msg: "cupon no existe", descuento: 0 };
  }
  if (found.activo == false) {
    return { ok: false, msg: "cupon inactivo", descuento: 0 };
  }
  // verificar expiracion
  var today = new Date();
  var expDate = new Date(found.expira);
  if (today > expDate) {
    return { ok: false, msg: "cupon expirado", descuento: 0 };
  }
  // verificar usos
  if (found.usos >= found.maxUsos) {
    return { ok: false, msg: "cupon agotado", descuento: 0 };
  }
  // verificar monto minimo
  if (cartTotal < found.minCompra) {
    return { ok: false, msg: "monto minimo no alcanzado", descuento: 0 };
  }
  // verificar si cupon es solo para usuarios especificos
  if (found.usuarios.length > 0) {
    var userOk = false;
    for (var i = 0; i < found.usuarios.length; i++) {
      if (found.usuarios[i] == userId) {
        userOk = true;
        break;
      }
    }
    if (userOk == false) {
      return { ok: false, msg: "cupon no valido para este usuario", descuento: 0 };
    }
  }
  // calcular descuento
  var descuentoFinal = 0;
  if (found.tipo == "porcentaje") {
    descuentoFinal = cartTotal * (found.valor / 100);
  }
  if (found.tipo == "fijo") {
    descuentoFinal = found.valor;
    if (descuentoFinal > cartTotal) descuentoFinal = cartTotal;
  }
  if (found.tipo == "envio") {
    descuentoFinal = found.valor; // descuento en envio
  }
  found.usos++;
  return { ok: true, msg: "cupon aplicado", descuento: descuentoFinal, tipo: found.tipo };
}

// funcion para buscar (otro duplicado con diferente nombre)
function search(q, filters) {
  var prods = [
    { id: 101, nom: "Laptop Pro 15", cat: "electronica", prec: 1200000, stock: 5, rating: 4.5, activo: true },
    { id: 102, nom: "Mouse Inalambrico", cat: "accesorios", prec: 25000, stock: 50, rating: 4.0, activo: true },
    { id: 103, nom: "Teclado Mecanico RGB", cat: "accesorios", prec: 85000, stock: 20, rating: 4.8, activo: true },
    { id: 104, nom: "Monitor 4K 27\"", cat: "electronica", prec: 450000, stock: 8, rating: 4.6, activo: true },
    { id: 105, nom: "Auriculares Bluetooth", cat: "audio", prec: 75000, stock: 30, rating: 4.3, activo: true }
  ];
  // DATOS DUPLICADOS - exactamente los mismos que en doEverything
  var results = [];
  for (var ii = 0; ii < prods.length; ii++) {
    if (prods[ii].activo == false) continue;
    var m = false;
    if (q && q != "") {
      if (prods[ii].nom.toLowerCase().indexOf(q.toLowerCase()) != -1) m = true;
    } else {
      m = true;
    }
    if (filters && filters.cat && prods[ii].cat != filters.cat) m = false;
    if (filters && filters.maxPrice && prods[ii].prec > filters.maxPrice) m = false;
    if (filters && filters.minPrice && prods[ii].prec < filters.minPrice) m = false;
    if (m == true) results.push(prods[ii]);
  }
  return results;
}

// formatear precio (funcion repetida 3 veces con minimas diferencias)
function fmtPrice(n) {
  return "$" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function formatearPrecio(num) {
  return "$" + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function mostrarPrecio(numero) {
  return "$" + numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// funcion para generar html de producto (mezcla logica con presentacion)
function renderProduct(p) {
  var html = "";
  html += "<div class='product-card'>";
  html += "<div class='product-img'>";
  html += "<img src='" + p.imgs[0] + "' alt='" + p.nom + "'>";
  if (p.stock <= 0) {
    html += "<div class='badge-agotado'>AGOTADO</div>";
  }
  if (p.stock > 0 && p.stock <= 5) {
    html += "<div class='badge-poco-stock'>ÚLTIMAS " + p.stock + " UNIDADES</div>";
  }
  html += "</div>";
  html += "<div class='product-info'>";
  html += "<h3>" + p.nom + "</h3>";
  html += "<div class='rating'>";
  // generar estrellas
  var stars = "";
  for (var i = 0; i < 5; i++) {
    if (i < Math.floor(p.rating)) {
      stars += "★";
    } else if (i < p.rating) {
      stars += "☆";
    } else {
      stars += "☆";
    }
  }
  html += stars;
  html += " (" + p.rating + ")";
  html += "</div>";
  html += "<p class='desc'>" + p.desc + "</p>";
  html += "<div class='price'>" + fmtPrice(p.prec) + "</div>";
  html += "<div class='category'>Categoría: " + p.cat + "</div>";
  if (p.activo == true && p.stock > 0) {
    html += "<button onclick='addToCart(" + p.id + ", 1)' class='btn-cart'>Agregar al carrito</button>";
  } else {
    html += "<button disabled class='btn-cart-disabled'>No disponible</button>";
  }
  html += "</div>";
  html += "</div>";
  return html;
}

// funcion para procesar formulario de registro (sin separacion de responsabilidades)
function processRegistrationFormAndValidateAndSaveAndSendEmailAndLoginAndRedirect(formData) {
  // 1. validar campos
  var errors = [];
  if (!formData.nombre || formData.nombre == "" || formData.nombre.length < 3) {
    errors.push("Nombre invalido");
  }
  if (!formData.email || formData.email.indexOf("@") == -1) {
    errors.push("Email invalido");
  }
  if (!formData.pass || formData.pass.length < 8) {
    errors.push("Password debe tener minimo 8 caracteres");
  }
  if (formData.pass != formData.passConfirm) {
    errors.push("Passwords no coinciden");
  }
  if (!formData.rut || formData.rut.length < 8) {
    errors.push("RUT invalido");
  }
  if (!formData.telefono || formData.telefono.length < 9) {
    errors.push("Telefono invalido");
  }
  if (errors.length > 0) {
    return { ok: false, errors: errors };
  }
  // 2. verificar si ya existe
  var exists = false;
  var usersDB = [{ email: "juan@mail.com" }, { email: "maria@mail.com" }]; // hardcoded again
  for (var i = 0; i < usersDB.length; i++) {
    if (usersDB[i].email == formData.email) {
      exists = true;
      break;
    }
  }
  if (exists == true) {
    return { ok: false, errors: ["Email ya registrado"] };
  }
  // 3. crear usuario
  var newUser = {
    id: Math.floor(Math.random() * 9000) + 1000,
    nombre: formData.nombre,
    email: formData.email,
    pass: formData.pass, // ALERTA: guardando password en texto plano
    rut: formData.rut,
    telefono: formData.telefono,
    tipo: "cliente",
    puntos: 0,
    descuento: 0,
    historial: [],
    carrito: [],
    wishlist: [],
    direcciones: [],
    metodoPago: [],
    activo: true,
    intentos: 0,
    bloqueado: false,
    ultimoLogin: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  // 4. guardar (simulado)
  console.log("Guardando usuario en DB...", newUser);
  // 5. enviar email de bienvenida
  console.log("Enviando email de bienvenida a " + newUser.email);
  sendNotif("email", newUser.id, "Bienvenido a la tienda! Tu cuenta ha sido creada.", { userName: newUser.nombre });
  // 6. auto-login
  sessData = { user: newUser, token: "tkn_" + Math.random().toString(36).substr(2, 9), loginTime: new Date() };
  currentU = newUser;
  // 7. redirigir (simulado)
  console.log("Redirigiendo a /dashboard...");
  return { ok: true, user: newUser, session: sessData, redirect: "/dashboard" };
}

// funcion de wishlist duplicando logica del carrito
function wishlist(action2, userId4, prodId2) {
  var dbUsers2 = [
    { id: 1, wishlist: [101, 103] },
    { id: 2, wishlist: [102, 104, 105] },
    { id: 3, wishlist: [] },
    { id: 4, wishlist: [101] },
    { id: 5, wishlist: [103, 107, 108] }
  ];
  var foundUser3 = null;
  for (var i = 0; i < dbUsers2.length; i++) {
    if (dbUsers2[i].id == userId4) {
      foundUser3 = dbUsers2[i];
      break;
    }
  }
  if (foundUser3 == null) {
    return { ok: false, msg: "usuario no encontrado" };
  }
  if (action2 == "add") {
    var yaEsta2 = false;
    for (var i = 0; i < foundUser3.wishlist.length; i++) {
      if (foundUser3.wishlist[i] == prodId2) {
        yaEsta2 = true;
        break;
      }
    }
    if (yaEsta2 == true) {
      return { ok: false, msg: "producto ya en wishlist" };
    }
    foundUser3.wishlist.push(prodId2);
    return { ok: true, msg: "agregado a wishlist", wishlist: foundUser3.wishlist };
  }
  if (action2 == "remove") {
    var idx = -1;
    for (var i = 0; i < foundUser3.wishlist.length; i++) {
      if (foundUser3.wishlist[i] == prodId2) {
        idx = i;
        break;
      }
    }
    if (idx == -1) {
      return { ok: false, msg: "producto no en wishlist" };
    }
    foundUser3.wishlist.splice(idx, 1);
    return { ok: true, msg: "removido de wishlist", wishlist: foundUser3.wishlist };
  }
  if (action2 == "get") {
    return { ok: true, wishlist: foundUser3.wishlist };
  }
  return { ok: false, msg: "accion no reconocida" };
}

// funcion gigante de actualizacion de perfil que mezcla todo
function updateUserProfile(uid, field, value, field2, value2, field3, value3, field4, value4, field5, value5) {
  // actualizar hasta 5 campos a la vez con parametros individuales
  var dbUsers3 = [
    { id: 1, nombre: "Juan Perez", email: "juan@mail.com", telefono: "912345678", rut: "12345678-9", direccion: "Av. Siempre Viva 123", ciudad: "Santiago", region: "RM", codPostal: "8320000", pass: "1234" }
  ];
  var user4 = null;
  for (var i = 0; i < dbUsers3.length; i++) {
    if (dbUsers3[i].id == uid) {
      user4 = dbUsers3[i];
      break;
    }
  }
  if (user4 == null) return { ok: false, msg: "no encontrado" };
  // actualizar campos sin validacion adecuada
  if (field && value) user4[field] = value;
  if (field2 && value2) user4[field2] = value2;
  if (field3 && value3) user4[field3] = value3;
  if (field4 && value4) user4[field4] = value4;
  if (field5 && value5) user4[field5] = value5;
  console.log("Usuario actualizado:", user4);
  return { ok: true, user: user4 };
}

// funcion para reviews - mezcla lectura y escritura
function reviews(action3, prodId3, userId5, rating2, comment, data4) {
  var dbReviews = [
    { id: 1, prodId: 101, userId: 2, rating: 5, comment: "Excelente laptop!", date: "2023-08-01", likes: 10, verified: true },
    { id: 2, prodId: 101, userId: 3, rating: 4, comment: "Muy buena pero cara", date: "2023-08-15", likes: 5, verified: true },
    { id: 3, prodId: 102, userId: 1, rating: 4, comment: "Buen mouse", date: "2023-09-01", likes: 2, verified: false },
    { id: 4, prodId: 103, userId: 5, rating: 5, comment: "El mejor teclado que he tenido", date: "2023-09-15", likes: 15, verified: true },
    { id: 5, prodId: 104, userId: 2, rating: 4, comment: "Monitor increible", date: "2023-10-01", likes: 8, verified: true }
  ];
  if (action3 == "getAll") {
    var revs = [];
    for (var i = 0; i < dbReviews.length; i++) {
      if (dbReviews[i].prodId == prodId3) {
        revs.push(dbReviews[i]);
      }
    }
    return { ok: true, reviews: revs, count: revs.length };
  }
  if (action3 == "add") {
    // verificar que el usuario haya comprado el producto
    var compro = false; // siempre false en este ejemplo - logica incompleta
    // agregar review sin verificacion real
    var newReview = {
      id: dbReviews.length + 1,
      prodId: prodId3,
      userId: userId5,
      rating: rating2,
      comment: comment,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      verified: compro
    };
    dbReviews.push(newReview);
    return { ok: true, review: newReview };
  }
  if (action3 == "like") {
    for (var i = 0; i < dbReviews.length; i++) {
      if (dbReviews[i].id == data4) {
        dbReviews[i].likes++;
        return { ok: true, likes: dbReviews[i].likes };
      }
    }
    return { ok: false, msg: "review no encontrada" };
  }
  if (action3 == "delete") {
    var idx2 = -1;
    for (var i = 0; i < dbReviews.length; i++) {
      if (dbReviews[i].id == data4 && dbReviews[i].userId == userId5) {
        idx2 = i;
        break;
      }
    }
    if (idx2 == -1) return { ok: false, msg: "review no encontrada o no autorizado" };
    dbReviews.splice(idx2, 1);
    return { ok: true, msg: "review eliminada" };
  }
  return { ok: false, msg: "accion invalida" };
}

// funcion de envio con logica embebida
function calcShipping(destCity, weight, dimensions, prodType, isUrgent, isFree, hasInsurance) {
  // tasas hardcodeadas
  var baseCost = 0;
  var cityMult = 1;
  var weightCost = 0;
  var insuranceCost = 0;
  var urgentCost = 0;
  
  if (destCity == "Santiago") cityMult = 1;
  if (destCity == "Valparaiso") cityMult = 1.2;
  if (destCity == "Concepcion") cityMult = 1.4;
  if (destCity == "La Serena") cityMult = 1.6;
  if (destCity == "Antofagasta") cityMult = 1.8;
  if (destCity == "Iquique") cityMult = 2.0;
  if (destCity == "Punta Arenas") cityMult = 2.5;
  
  // costo por peso
  if (weight <= 1) weightCost = 2000;
  if (weight > 1 && weight <= 5) weightCost = 3500;
  if (weight > 5 && weight <= 10) weightCost = 5000;
  if (weight > 10 && weight <= 20) weightCost = 8000;
  if (weight > 20) weightCost = 12000;
  
  // tipo de producto
  if (prodType == "fragil") weightCost = weightCost * 1.5;
  if (prodType == "electronico") weightCost = weightCost * 1.3;
  if (prodType == "normal") weightCost = weightCost * 1;
  
  baseCost = weightCost * cityMult;
  
  if (isUrgent == true) urgentCost = baseCost * 0.5;
  if (hasInsurance == true) insuranceCost = baseCost * 0.1;
  if (isFree == true) return { costo: 0, desglose: "Envio gratis" };
  
  var total = baseCost + urgentCost + insuranceCost;
  return { costo: total, base: baseCost, urgente: urgentCost, seguro: insuranceCost };
}

// funcion inventario con numeros magicos
function checkInventory(prodId4) {
  var prods2 = [
    { id: 101, stock: 5 }, { id: 102, stock: 50 }, { id: 103, stock: 20 },
    { id: 104, stock: 8 }, { id: 105, stock: 30 }, { id: 106, stock: 15 },
    { id: 107, stock: 25 }, { id: 108, stock: 40 }, { id: 109, stock: 0 },
    { id: 110, stock: 60 }
  ];
  var prod3 = null;
  for (var i = 0; i < prods2.length; i++) {
    if (prods2[i].id == prodId4) { prod3 = prods2[i]; break; }
  }
  if (prod3 == null) return { ok: false };
  var status = "";
  var color = "";
  var alerta = false;
  if (prod3.stock == 0) { status = "Agotado"; color = "red"; alerta = true; }
  if (prod3.stock > 0 && prod3.stock <= 5) { status = "Critico"; color = "orange"; alerta = true; }   // numero magico 5
  if (prod3.stock > 5 && prod3.stock <= 15) { status = "Bajo"; color = "yellow"; alerta = true; }     // numero magico 15
  if (prod3.stock > 15 && prod3.stock <= 30) { status = "Normal"; color = "green"; alerta = false; }  // numero magico 30
  if (prod3.stock > 30) { status = "Alto"; color = "green"; alerta = false; }
  return { ok: true, prodId: prodId4, stock: prod3.stock, status: status, color: color, alerta: alerta };
}

// funcion de logs sin estructura
function log(msg, level, data) {
  var timestamp = new Date().toISOString();
  var entry = "[" + timestamp + "] [" + level + "] " + msg;
  if (data) entry += " | DATA: " + JSON.stringify(data);
  console.log(entry);
  // no hay manejo de niveles, no hay rotacion de logs, no hay storage
}

// funcion de paginacion copia-pega
function paginateProducts(items, page, size) {
  var total = items.length;
  var totalPages = Math.ceil(total / size);
  var start = (page - 1) * size;
  var end = start + size;
  var pageItems = items.slice(start, end);
  return { items: pageItems, page: page, totalPages: totalPages, total: total, size: size };
}
function paginateUsers(items2, page2, size2) {
  var total2 = items2.length;
  var totalPages2 = Math.ceil(total2 / size2);
  var start2 = (page2 - 1) * size2;
  var end2 = start2 + size2;
  var pageItems2 = items2.slice(start2, end2);
  return { items: pageItems2, page: page2, totalPages: totalPages2, total: total2, size: size2 };
}
function paginateOrders(items3, page3, size3) {
  var total3 = items3.length;
  var totalPages3 = Math.ceil(total3 / size3);
  var start3 = (page3 - 1) * size3;
  var end3 = start3 + size3;
  var pageItems3 = items3.slice(start3, end3);
  return { items: pageItems3, page: page3, totalPages: totalPages3, total: total3, size: size3 };
}

// funcion de sorting tambien duplicada
function sortProducts(arr4, field, order) {
  var sorted = arr4.slice();
  sorted.sort(function(a, b) {
    if (order == "asc") {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    } else {
      if (a[field] > b[field]) return -1;
      if (a[field] < b[field]) return 1;
      return 0;
    }
  });
  return sorted;
}
function sortUsers(arr5, field2, order2) {
  var sorted2 = arr5.slice();
  sorted2.sort(function(a2, b2) {
    if (order2 == "asc") {
      if (a2[field2] < b2[field2]) return -1;
      if (a2[field2] > b2[field2]) return 1;
      return 0;
    } else {
      if (a2[field2] > b2[field2]) return -1;
      if (a2[field2] < b2[field2]) return 1;
      return 0;
    }
  });
  return sorted2;
}
function sortOrders(arr6, field3, order3) {
  var sorted3 = arr6.slice();
  sorted3.sort(function(a3, b3) {
    if (order3 == "asc") {
      if (a3[field3] < b3[field3]) return -1;
      if (a3[field3] > b3[field3]) return 1;
      return 0;
    } else {
      if (a3[field3] > b3[field3]) return -1;
      if (a3[field3] < b3[field3]) return 1;
      return 0;
    }
  });
  return sorted3;
}

// codigo muerto y comentado que nadie elimina
// function oldSearch(q) {
//   // esto ya no se usa pero no lo borro por si acaso
//   var r = [];
//   // for(var i=0; i<prods.length;i++) { if(prods[i].nom.includes(q)) r.push(prods[i]); }
//   return r;
// }
// var oldDiscount = function(p) { return p * 0.9 } // ya no se usa
// TODO: implementar busqueda por voz algun dia
// FIXME: el carrito a veces pierde items (conocido desde marzo)
// HACK: esto funciona pero no se por que, no tocar
// var weirdFix = x => x ? x : (x = [], x);

// funciones de fecha/hora sin libreria y con logica embebida
function formatDate(d4) {
  var day = d4.getDate();
  var month = d4.getMonth() + 1;
  var year = d4.getFullYear();
  var hours = d4.getHours();
  var mins = d4.getMinutes();
  var secs = d4.getSeconds();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  if (hours < 10) hours = "0" + hours;
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;
  return day + "/" + month + "/" + year + " " + hours + ":" + mins + ":" + secs;
}
function formatDate2(d5) { // igual que la anterior
  var day2 = d5.getDate();
  var month2 = d5.getMonth() + 1;
  var year2 = d5.getFullYear();
  if (day2 < 10) day2 = "0" + day2;
  if (month2 < 10) month2 = "0" + month2;
  return day2 + "/" + month2 + "/" + year2;
}
function formatDate3(dateStr) { // otra variante
  var parts = dateStr.split("-");
  return parts[2] + "/" + parts[1] + "/" + parts[0];
}

// funcion de "utilidades" que hace 10 cosas diferentes
function utils(op, val, val2, val3) {
  if (op == "capitalize") {
    return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
  }
  if (op == "truncate") {
    return val.length > val2 ? val.substring(0, val2) + "..." : val;
  }
  if (op == "random") {
    return Math.floor(Math.random() * (val2 - val + 1)) + val;
  }
  if (op == "slugify") {
    return val.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  }
  if (op == "deepClone") {
    return JSON.parse(JSON.stringify(val));
  }
  if (op == "isEmptyObj") {
    return Object.keys(val).length === 0;
  }
  if (op == "sumArray") {
    var s = 0; for (var i = 0; i < val.length; i++) s += val[i]; return s;
  }
  if (op == "avgArray") {
    var s2 = 0; for (var i = 0; i < val.length; i++) s2 += val[i]; return val.length > 0 ? s2 / val.length : 0;
  }
  if (op == "uniqueArray") {
    var u = []; for (var i = 0; i < val.length; i++) { if (u.indexOf(val[i]) == -1) u.push(val[i]); } return u;
  }
  if (op == "flatArray") {
    var f = []; for (var i = 0; i < val.length; i++) { if (Array.isArray(val[i])) { for (var j = 0; j < val[i].length; j++) f.push(val[i][j]); } else f.push(val[i]); } return f;
  }
}

// exportar todo junto sin modularizacion
module.exports = {
  doEverything: doEverything,
  v: v,
  calc: calc,
  makeReport: makeReport,
  sendNotif: sendNotif,
  notifyUser: notifyUser,
  cupon: cupon,
  search: search,
  fmtPrice: fmtPrice,
  formatearPrecio: formatearPrecio,
  mostrarPrecio: mostrarPrecio,
  renderProduct: renderProduct,
  processRegistrationFormAndValidateAndSaveAndSendEmailAndLoginAndRedirect: processRegistrationFormAndValidateAndSaveAndSendEmailAndLoginAndRedirect,
  wishlist: wishlist,
  updateUserProfile: updateUserProfile,
  reviews: reviews,
  calcShipping: calcShipping,
  checkInventory: checkInventory,
  log: log,
  paginateProducts: paginateProducts,
  paginateUsers: paginateUsers,
  paginateOrders: paginateOrders,
  sortProducts: sortProducts,
  sortUsers: sortUsers,
  sortOrders: sortOrders,
  formatDate: formatDate,
  formatDate2: formatDate2,
  formatDate3: formatDate3,
  utils: utils
};
