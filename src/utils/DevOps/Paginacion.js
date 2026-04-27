//Las tres funciones en una sola.
export function paginate(items, page, size){
  const start = (page - 1) * size;
  return{
    items: items.slice(start, start + size),
    page,
    total: items.length,
    totalPages: Math.ceil(items.length / size),
    size
  };
}
