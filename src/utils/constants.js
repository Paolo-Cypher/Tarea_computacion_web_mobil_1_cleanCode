/**
 * CONSTANTES DEL SISTEMA
 * Centraliza todos los valores fijos del sistema de tienda online.
 * De esta forma se evitan los "números mágicos" dispersos en el código.
 */

// Autenticación
export const MAX_LOGIN_ATTEMPTS = 3;
export const MIN_PASSWORD_LENGTH = 8;
export const MIN_NAME_LENGTH = 3;
export const MIN_PHONE_LENGTH = 9;
export const MIN_RUT_LENGTH = 10;

// Impuestos
export const IVA_RATE = 0.19;

// Niveles de usuario según puntos acumulados
export const USER_LEVELS = {
  BRONCE:  { name: "bronce",  minPoints: 0,   discountPct: 0  },
  PLATA:   { name: "plata",   minPoints: 100,  discountPct: 5  },
  ORO:     { name: "oro",     minPoints: 200,  discountPct: 10 },
  PLATINO: { name: "platino", minPoints: 300,  discountPct: 15 },
};

// Puntos de fidelidad
export const POINTS_PER_PESO = 1000;

// Umbrales de stock para el inventario
export const STOCK_THRESHOLDS = {
  AGOTADO: 0,
  CRITICO: 5,
  BAJO:    15,
  NORMAL:  30,
};

// Tasas de interés según número de cuotas
export const INSTALLMENT_RATES = {
  2:  0.02,
  3:  0.04,
  6:  0.08,
  12: 0.15,
  24: 0.28,
  36: 0.45,
};

// Costo de envío base según peso en kg
export const SHIPPING_WEIGHT_COSTS = [
  { maxWeight: 1,        cost: 2000  },
  { maxWeight: 5,        cost: 3500  },
  { maxWeight: 10,       cost: 5000  },
  { maxWeight: 20,       cost: 8000  },
  { maxWeight: Infinity, cost: 12000 },
];

// Multiplicadores de envío por ciudad
export const SHIPPING_CITY_MULTIPLIERS = {
  "Santiago":     1.0,
  "Valparaiso":   1.2,
  "Concepcion":   1.4,
  "La Serena":    1.6,
  "Antofagasta":  1.8,
  "Iquique":      2.0,
  "Punta Arenas": 2.5,
};

// Multiplicadores por tipo de producto en envío
export const SHIPPING_PRODUCT_TYPE_MULTIPLIERS = {
  fragil:      1.5,
  electronico: 1.3,
  normal:      1.0,
};

// Tipos de usuario del sistema
export const USER_TYPES = {
  ADMIN:    "admin",
  CLIENTE:  "cliente",
  VENDEDOR: "vendedor",
};

// Canales de notificación válidos
export const NOTIFICATION_CHANNELS = ["email", "sms", "push", "inapp"];
