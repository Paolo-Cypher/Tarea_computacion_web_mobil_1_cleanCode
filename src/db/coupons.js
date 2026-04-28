// =====================================================
// src/data/coupons.js
// Módulo 4: Carrito y Ventas
// Datos de cupones de descuento del sistema.
// Antes estaban dentro de la función cupon() en problema.js (líneas 606-613).
// =====================================================
 
//
 // Lista de cupones disponibles en el sistema.
 //
 // Estructura de cada cupón:
 //   - code: código que el usuario ingresa al canjear
 //  - tipo: "porcentaje"/"fijo"/"envio"
 //           porcentaje = descuenta un % del total
 //           fijo       = descuenta un monto fijo en pesos
 //           envio      = descuenta sobre el costo de envío
 //  - valor: número (interpretado según el tipo)
 //  - minCompra: monto mínimo del carrito para poder usarlo
 //  - maxUsos: cantidad total de veces que puede canjearse globalmente
 //  - usos: cuántas veces ya se ha canjeado
 //  - activo: si está habilitado o no
 //  - expira: fecha de vencimiento (formato YYYY-MM-DD)
 //  - categorias: array de categorías a las que aplica ([] = todas)
 //  - usuarios: array de IDs de usuario habilitados ([] = todos)
 //
export const coupons = [
  {
    code: "DESC10",
    tipo: "porcentaje",
    valor: 10,
    minCompra: 50000,
    maxUsos: 100,
    usos: 45,
    activo: true,
    expira: "2024-12-31",
    categorias: [],
    usuarios: [],
  },
  {
    code: "DESC20",
    tipo: "porcentaje",
    valor: 20,
    minCompra: 100000,
    maxUsos: 50,
    usos: 50, // ya alcanzó el máximo de usos
    activo: true,
    expira: "2024-06-30",
    categorias: ["electronica"],
    usuarios: [],
  },
  {
    code: "ENVGRATIS",
    tipo: "envio",
    valor: 100,
    minCompra: 30000,
    maxUsos: 200,
    usos: 180,
    activo: true,
    expira: "2024-12-31",
    categorias: [],
    usuarios: [],
  },
  {
    code: "BIENVENIDO",
    tipo: "fijo",
    valor: 5000,
    minCompra: 20000,
    maxUsos: 1000,
    usos: 523,
    activo: true,
    expira: "2025-12-31",
    categorias: [],
    usuarios: [],
  },
  {
    code: "VIP2024",
    tipo: "porcentaje",
    valor: 25,
    minCompra: 200000,
    maxUsos: 20,
    usos: 15,
    activo: true,
    expira: "2024-12-31",
    categorias: [],
    usuarios: [1, 3, 5]
  },
];