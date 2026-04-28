import { expect } from "chai";

// Importacion de funciones a testear
import { buscarProductos, renderProduct } from "../src/logic/catalog.js";
import { dbProducts } from "../src/db/db.js";

// Test: Modulo de Catálogo
describe("Modulo de Catálogo", () => {
  
  // 1er test: Filtrado por texto
  it("Debería filtrar productos por texto (nombre, descripción o tags)", () => {
    const busqueda = "Mouse";
    const resultado = buscarProductos(dbProducts, busqueda, null, null);
    
    expect(resultado).to.be.an("array");
    expect(resultado.length).to.be.at.least(1);
    // El primer resultado debería ser el Mouse Inalambrico basado en db.js
    expect(resultado[0].nom).to.contain("Mouse");
  });

  // 2do test: Filtro por categoría
  it("Debería filtrar correctamente por categoría", () => {
    const categoria = "accesorios";
    const resultado = buscarProductos(dbProducts, null, categoria, null);
    
    expect(resultado.every(p => p.cat === categoria)).to.be.true;
    expect(resultado.length).to.be.greaterThan(0);
  });

  // 3er test: Filtro por precio
  it("Debería respetar los filtros de precio mínimo y máximo", () => {
    const filtros = { min: 30000, max: 100000 };
    const resultado = buscarProductos(dbProducts, null, null, filtros);
    
    expect(resultado.every(p => p.prec >= 30000 && p.prec <= 100000)).to.be.true;
  });

  // 4to test: Validación de productos activos
  it("No debería incluir productos marcados como inactivos", () => {
    // La Silla Gamer (ID 109) es inactiva en db.js
    const resultado = buscarProductos(dbProducts, "Silla", null, null);
    expect(resultado.find(p => p.id === 109)).to.be.undefined;
  });

  // 5to test: Renderizado de componentes
  it("Debería generar el HTML correcto para un producto", () => {
    const producto = dbProducts[0]; // Laptop Pro 15
    const html = renderProduct(producto);
    
    expect(html).to.be.a("string");
    expect(html).to.contain("product-card");
    expect(html).to.contain(producto.nom);
  });
});