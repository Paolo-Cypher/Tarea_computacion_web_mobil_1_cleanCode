//Las tres funciones en una.
export function formatoPrecio(amount){
  if(amount === null || amount === undefined){
    throw new Error("El monto no puede ser nulo o indefinido");
  }

  const opciones = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
};

const montoFormateado = numero.toLocaleString("es-CL", opciones);

return `$${montoFormateado}`;
}