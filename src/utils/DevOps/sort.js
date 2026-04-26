//Otra funcion que estaba duplicada.
function sort(arr, field, order = "asc") {
  return arr.slice().sort((a, b) => {
    if (a[field] === b[field]) return 0;
    return order === "asc"
    ? a[field] > b[field] ? 1 : -1
    : a[field] < b[field] ? 1 : -1;
  });
}