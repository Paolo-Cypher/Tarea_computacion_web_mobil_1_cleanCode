//Las tres funciones en una.
export function formatoPrecio(amount){ 
  if(amount === null || amount === undefined){// Para el control de errores, si llega un null o
    // undefined.
    throw new Error("El monto no puede ser nulo o indefinido");
  }
// Aqui se conficgura el formato
// No hay limite de decimales mínimos.
// Un maximo de 2 decimales.
  const opciones = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
};

// Esto permite obtener la moneda nacional.
const montoFormateado = amount.toLocaleString("es-CL", opciones);
// Retorna el monto.
return `$${montoFormateado}`;
}
