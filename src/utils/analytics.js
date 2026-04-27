export const calculateDiscount = (price, discount) => price * (discount / 100);

export const applyDiscount = (price, discount) => {
  const discountAmount = calculateDiscount(price, discount);
  return price - discountAmount;
};

export const applyMultipleDiscounts = (basePrice, d1, d2, d3) => {
  let price = basePrice;
  let dscto1 = 0, dscto2 = 0, dscto3 = 0;

  if (d1 > 0) {
    dscto1 = calculateDiscount(price, d1);
    price -= dscto1;
  }

  if (d2 > 0) {
    dscto2 = calculateDiscount(price, d2);
    price -= dscto2;
  }

  if (d3 > 0) {
    dscto3 = calculateDiscount(price, d3);
    price -= dscto3;
  }

  return { price, dscto1, dscto2, dscto3 };
};

export const calculateIVA = (price) => price * 0.19;

export const applyIVA = (price) => price + calculateIVA(price);

export const getInterestRate = (installments) => {
  const rates = { 2: 0.02, 3: 0.04, 6: 0.08, 12: 0.15, 24: 0.28, 36: 0.45 };
  return rates[installments] || 0;
};

export const calculateInstallmentInterest = (price, installments) => {
  if (installments <= 1) return 0;
  const rate = getInterestRate(installments);
  return price * rate;
};

export const calc = (p, d, d2, d3, iva, envio, cuotas) => {
  const { price: subtotalAfterDiscounts, dscto1, dscto2, dscto3 } = applyMultipleDiscounts(p, d, d2, d3);
  
  let finalPrice = subtotalAfterDiscounts;
  let ivaAmount = 0;

  if (iva === true) {
    ivaAmount = calculateIVA(finalPrice);
    finalPrice += ivaAmount;
  }

  if (envio > 0) {
    finalPrice += envio;
  }

  const subtotal = finalPrice;
  let interestAmount = 0;

  if (cuotas > 1) {
    interestAmount = calculateInstallmentInterest(finalPrice, cuotas);
    finalPrice += interestAmount;
  }

  return {
    base: p,
    dscto1,
    dscto2,
    dscto3,
    subtotal,
    iva: ivaAmount,
    envio,
    totalCuota: cuotas > 1 ? finalPrice / cuotas : finalPrice,
    total: finalPrice
  };
};

const calculateSaleStats = (data) => {
  let total = 0, count = 0, max = 0, min = 999999999;
  
  data.forEach(item => {
    const value = item.total;
    total += value;
    count++;
    if (value > max) max = value;
    if (value < min) min = value;
  });

  const avg = count > 0 ? total / count : 0;
  return { total, count, avg, max, min };
};

const calculateProductStats = (data) => {
  let total = 0, count = 0, max = 0, min = 999999999;
  
  data.forEach(item => {
    const value = item.prec;
    total += value;
    count++;
    if (value > max) max = value;
    if (value < min) min = value;
  });

  const avg = count > 0 ? total / count : 0;
  return { total, count, avg, max, min };
};

const calculateUserStats = (data) => {
  let total = 0, count = 0, max = 0, min = 999999999;
  
  data.forEach(item => {
    const value = item.puntos;
    total += value;
    count++;
    if (value > max) max = value;
    if (value < min) min = value;
  });

  const avg = count > 0 ? total / count : 0;
  return { total, count, avg, max, min };
};

const buildSalesReport = (from, to, data) => {
  const stats = calculateSaleStats(data);
  const lines = data.map(venta => `Orden: ${venta.id} | Total: $${venta.total} | Estado: ${venta.estado}`);
  
  let report = "=== REPORTE DE VENTAS ===\n";
  report += `Desde: ${from}\n`;
  report += `Hasta: ${to}\n`;
  report += "========================\n";
  report += lines.join("\n");
  report += "\n------------------------\n";
  report += `Total ordenes: ${stats.count}\n`;
  report += `Total ingresos: $${stats.total}\n`;
  report += `Promedio por orden: $${stats.avg}\n`;
  report += `Venta maxima: $${stats.max}\n`;
  report += `Venta minima: $${stats.min}\n`;
  
  return report;
};

const buildProductsReport = (from, to, data) => {
  const stats = calculateProductStats(data);
  const lines = data.map(prod => `Producto: ${prod.nom} | Precio: $${prod.prec} | Stock: ${prod.stock} | Rating: ${prod.rating}`);
  
  let report = "=== REPORTE DE PRODUCTOS ===\n";
  report += `Desde: ${from}\n`;
  report += `Hasta: ${to}\n`;
  report += "============================\n";
  report += lines.join("\n");
  report += "\n----------------------------\n";
  report += `Total productos: ${stats.count}\n`;
  report += `Precio promedio: $${stats.avg}\n`;
  report += `Precio maximo: $${stats.max}\n`;
  report += `Precio minimo: $${stats.min}\n`;
  
  return report;
};

const buildUsersReport = (from, to, data) => {
  const stats = calculateUserStats(data);
  const lines = data.map(usr => `Usuario: ${usr.nombre} | Email: ${usr.email} | Tipo: ${usr.tipo} | Puntos: ${usr.puntos} | Activo: ${usr.activo}`);
  
  let report = "=== REPORTE DE USUARIOS ===\n";
  report += `Desde: ${from}\n`;
  report += `Hasta: ${to}\n`;
  report += "===========================\n";
  report += lines.join("\n");
  report += "\n---------------------------\n";
  report += `Total usuarios: ${stats.count}\n`;
  report += `Puntos promedio: ${stats.avg}\n`;
  report += `Max puntos: ${stats.max}\n`;
  report += `Min puntos: ${stats.min}\n`;
  
  return report;
};

export const makeReport = (type, from, to, data, data2, data3) => {
  if (type === "ventas") return buildSalesReport(from, to, data);
  if (type === "productos") return buildProductsReport(from, to, data);
  if (type === "usuarios") return buildUsersReport(from, to, data);
  return "";
};

const getCityMultiplier = (city) => {
  const multipliers = {
    "Santiago": 1,
    "Valparaiso": 1.2,
    "Concepcion": 1.4,
    "La Serena": 1.6,
    "Antofagasta": 1.8,
    "Iquique": 2.0,
    "Punta Arenas": 2.5
  };
  return multipliers[city] || 1;
};

const getWeightCost = (weight) => {
  if (weight <= 1) return 2000;
  if (weight <= 5) return 3500;
  if (weight <= 10) return 5000;
  if (weight <= 20) return 8000;
  return 12000;
};

const getProductTypeMultiplier = (prodType) => {
  const multipliers = {
    "fragil": 1.5,
    "electronico": 1.3,
    "normal": 1
  };
  return multipliers[prodType] || 1;
};

export const calcShipping = (destCity, weight, dimensions, prodType, isUrgent, isFree, hasInsurance) => {
  if (isFree === true) return { costo: 0, desglose: "Envio gratis" };
  
  const cityMult = getCityMultiplier(destCity);
  let weightCost = getWeightCost(weight);
  const prodTypeMultiplier = getProductTypeMultiplier(prodType);
  
  weightCost *= prodTypeMultiplier;
  
  const baseCost = weightCost * cityMult;
  const urgentCost = isUrgent === true ? baseCost * 0.5 : 0;
  const insuranceCost = hasInsurance === true ? baseCost * 0.1 : 0;
  
  const total = baseCost + urgentCost + insuranceCost;
  
  return { costo: total, base: baseCost, urgente: urgentCost, seguro: insuranceCost };
};
