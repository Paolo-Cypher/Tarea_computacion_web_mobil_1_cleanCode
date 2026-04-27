//Otra funcion que estaba duplicada.
export function sort(arr, field, order = "asc") {
  // creamos una copia para que no modifique el array original
  const copia = arr.slice();

  return copia.sort((a, b) => {
    const valorA = a[field];
    const valorB = b[field];


    //y si son iguales, no toque le dice.
    if (valorA === valorB) {
      return 0;
    }


    //comparamos dependiendo de lo que venga.
    const TieneOrdenAscendente = order === "asc";
    const A_es_Mayor = valorA > valorB;

    if (TieneOrdenAscendente) { // esto es para saber el posicionamiento.
      // Si es mayor A, retorna 1.
      // en otro caso, retorna -1.
      return A_es_Mayor ? 1 : -1;
    } else {
      return A_es_Mayor ? -1 : 1;
    }
  });
}