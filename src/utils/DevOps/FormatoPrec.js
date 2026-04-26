//Las tres funciones en una.
function formatoPrecio(amount) {
  return "$" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}