//Funcion de fechas, modificada.
export function FormatoFecha(date, format = "DD/MM/YYYY HH:MM:SS") {
  //Verifica si el tipo de entrada es correcto y lo transforma a Date
  //para obtener la fecha.
  if (typeof date === "string") {
    date = new Date(date);
  }
 const day = String(date.getDate()).padStart(2, '0'); // Se obtiene el dia.
 const month = String(date.getMonth() + 1).padStart(2, '0');// el mes
 const year = date.getFullYear();// el año
 const hours = String(date.getHours()).padStart(2, '0');// las horas
 const minutes = String(date.getMinutes()).padStart(2, '0');// minutos
 const seconds = String(date.getSeconds()).padStart(2, '0');// y segundos. Verificando que sean 2 digitos.
  if (format === "DD/MM/YYYY") { // Esto dice: Si obtenemos Fecha sola, retorna sin hora.
    return `${day}/${month}/${year}`;
  }
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;// en otro caso sale todo nomas.
}
