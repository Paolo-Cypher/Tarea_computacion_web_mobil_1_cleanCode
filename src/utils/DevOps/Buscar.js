//Esta es la funcion search() modificada.
import { BaseDatos } from './src/BaseDatos.js';
function Buscar(q, filters = []) {
 let resultado = BaseDatos.productos.filter(producto => {
  const query = q.toLowerCase();
  return (
    producto.nom.toLowerCase().includes(query) ||
    producto.desc.toLowerCase().includes(query) ||
    producto.tags.some(tag => tag.toLowerCase().includes(query))
  );
 });
}
// Por aqui los filtros por categoria.
if (filters?.categoria) {
  resultado = resultado.filter(p => p.cat === filters.categoria);
}
// El filtrado por precio.
if (filters?.precioMin) {
  resultado = resultado.filter(p => p.prec >= filters.precioMin);
}
if (filters?.maxPrecio) {
  resultado = resultado.filter(p => p.prec <= filters.maxPrecio);
}
// Filtrar por Rating
if (filters?.ratingMin) {
  resultado = resultado.filter(p => p.rating >= filters.ratingMin);
};