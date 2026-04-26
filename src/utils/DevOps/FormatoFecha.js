//Funcion de fechas, modificada.
function FormatoFecha(date, format = "DD/MM/YYYY HH:MM:SS") {
  if (typeof date === "string") {
    date = new Date(date);
  }
 const day = String(date.getDate()).padStart(2, '0');
 const month = String(date.getMonth() + 1).padStart(2, '0');
 const year = date.getFullYear();
 const hours = String(date.getHours()).padStart(2, '0');
 const minutes = String(date.getMinutes()).padStart(2, '0');
 const seconds = String(date.getSeconds()).padStart(2, '0');
  if (format === "DD/MM/YYYY") {
    return `${day}/${month}/${year}`;
  }
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}