/**
 * MÓDULO DE CATÁLOGO - Módulo 3
 *  Este archivo centraliza la lógica de negocio para la gestión de productos.
 * Incluye funciones de filtrado avanzado y renderizado dinámico de componentes.
 * Autor: Paolo Sepúlveda
 * Fecha ultima actualización: 28/04/2026
 */

function fmtPrice(n) {
  return "$" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

  //el extraDat y el moreData son para filtros adicionales, como categoria, precio minimo, precio maximo, etc. Vere como la cambio despues, pero por ahora lo dejo asi para avanzar con el resto de la logica, ojo ahi
export const buscarProductos  = (dbProducts, textoBuscado, categoria, moreData) =>{ //funcion flecha, ok
    let precioMinimo = moreData ? moreData.min : 0; //aca es lo que explico el profe, es si hay info en moreData se pone eso, sino 0
    let precioMaximo = moreData ? moreData.max : 999999999; //lo mismo aca pero con el maximo

    return dbProducts.filter((prod) => { //uso de filter en vez de for
        //si no esta activo, es que no tiene stock o esta malo, ver dbProdcut, ahi hay un estado "activo" en cada prodcuto
        if(prod.activo == false) return false; //return, esto era lo que hacia if (prod.activo == false) continue;
        if(prod.prec < precioMinimo || prod.prec > precioMaximo) return false; //aca es lo mismo pero con el precio, si el precio es menor al minimo o mayor al maximo, no lo quiero
        if(categoria && prod.cat !== categoria) return false; //veo si hay categoria, y si el producto no es de esa categoria, no lo quiero
        if(!textoBuscado) return true; //si no hay texto buscado, entonces me quedo con el producto. el texto buscado es tags, nombre o descripcion, lo que sea, si no hay texto buscado, entonces me quedo con el producto sin importar nada mas
        const busqueda = textoBuscado.toLowerCase(); //paso a minuscula el texto buscado para hacer la busqueda case insensitive    
        
        const nombreMatch = prod.nom.toLowerCase().includes(busqueda); //veo si el nombre del producto incluye el texto buscado
        const descripcionMatch = prod.desc.toLowerCase().includes(busqueda); //veo si la descripcion del producto incluye el texto buscado
        const tagsMatch = prod.tags.some(tag => tag.toLowerCase().includes(busqueda)); //veo si alguna de las tags del producto incluye el texto buscado
    
        return nombreMatch || descripcionMatch || tagsMatch; //si alguna de las tres cosas coincide, entonces me quedo con el producto
    });
    //puede que luego se cambien las demas malas practicas como por ejemplo prod.tags y sea producto.tags o prodcuto.categoria, etc, cambiar luego
};

//Funcion nueva de renderProduct
export function renderProduct(producto) {
    const etiquetaStock = producto.stock <=0
 ? `<div class='badge-agotado'>AGOTADO</div>`
 : producto.stock > 0 && producto.stock <= 5 
 ? `<div class='badge-poco-stock'>ÚLTIMAS ${producto.stock} UNIDADES</div>`
 : '';
 // esto se ve feo, pero es mejor que lo que estaba antes
 //genera las estrellas segun el rating, redondeando hacia abajo, y añadiendo estrellas vacias hasta 5
    const estrellas = "★".repeat(Math.floor(producto.rating)) + "☆".repeat(5 - Math.floor(producto.rating));

    const botonHTML = (producto.activo && producto.stock > 0) //practicamente  es lo antiguo pero con operador ternario para no repetir el codigo del boton
        ? `<button onclick='addToCart(${producto.id}, 1)' class='btn-cart'>Agregar al carrito</button>`
        : `<button disabled class='btn-cart-disabled'>No disponible</button>`;
        //aqui lo que se hace es generar el html del producto usando template literals (osea lo de los backticks ``), lo que hace que sea mas legible y facil de modificar, sigue teniendo la mezcla de logica y presentacion.
        return `<div class='product-card'>
            <div class='product-img'>
                <img src='${producto.imgs[0]}' alt='${producto.nom}'>
                ${etiquetaStock}
            </div>
            <div class='product-info'>
                <h3>${producto.nom}</h3>
                <div class='rating'>
                    ${estrellas}
                    (${producto.rating})
                </div>
                <p class='desc'>${producto.desc}</p>
                <div class='price'>${fmtPrice(producto.prec)}</div>
                <div class='category'>Categoría: ${producto.cat}</div>
                ${botonHTML}
            </div>
        </div>`;
} //OJO que estoy llamando a la funcion fmtPrice que puede que se cambie el nombre a futuro, si es asi, voy a tener que cambiarla e importarla

// //Esta va en el problema.js, pero la dejo aqui por ahora para avanzar con la logica, luego la cambio de lugar
//   // ordenar por rating actualizado
// if(action == "buscarProductos"){
//     let resultado = buscarProductos(dbProducts, dat, extraDat, moreData);
//     //esto es lo que hace el cambio y no el buble sort, es decir, el sort es una funcion de los arrays que hace exactamente lo mismo que el bubble pero de forma mas eficiente.
//     resultado.sort((a, b) => b.rating - a.rating); //ordenar por rating de mayor a menor
//     const htmlResultadoFinal = resultado.map(producto => renderProduct(producto)).join(''); //renderizar cada producto a html y unirlos en un string
//     //voy a ver si quedo bien luego, porque primera vez que ocupo join
//     cb({ ok: true, msg: "ok", data: htmlResultadoFinal});//practicamente es lo mismo de antes pero le mando el html ya renderizado
//     return;
// }
