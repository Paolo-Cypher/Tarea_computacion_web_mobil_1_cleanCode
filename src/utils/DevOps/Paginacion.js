//Las tres funciones en una sola.
export function paginate(items, page, size){
  const start = (page - 1) * size; // iniciar pagina en 0.
  return{ // retorno del objeto de pagiacion.
    items: items.slice(start, start + size),
    page,//indica la pagina actual.
    total: items.length, // cantidad de elementos antes de dividirlo.
    totalPages: Math.ceil(items.length / size),// calculo total de paginas.
    size // Esto es para saber cuantos elementos se solicitaron por pagina.
  };
}
