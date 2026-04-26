export const BaseDatos = {
    users: [
    { id: 1, nombre: "Juan Perez", email: "juan@mail.com", pass: "1234", tipo: "admin", puntos: 150, descuento: 0, historial: [], carrito: [], wishlist: [], direcciones: [], metodoPago: [], activo: true, intentos: 0, bloqueado: false, ultimoLogin: null, createdAt: "2023-01-01", updatedAt: "2023-06-01" },
    { id: 2, nombre: "Maria Lopez", email: "maria@mail.com", pass: "abcd", tipo: "cliente", puntos: 80, descuento: 5, historial: [], carrito: [], wishlist: [], direcciones: [], metodoPago: [], activo: true, intentos: 0, bloqueado: false, ultimoLogin: null, createdAt: "2023-02-01", updatedAt: "2023-06-15" },
    { id: 3, nombre: "Pedro Gonzalez", email: "pedro@mail.com", pass: "pass123", tipo: "vendedor", puntos: 200, descuento: 10, historial: [], carrito: [], wishlist: [], direcciones: [], metodoPago: [], activo: true, intentos: 0, bloqueado: false, ultimoLogin: null, createdAt: "2023-03-01", updatedAt: "2023-07-01" },
    { id: 4, nombre: "Ana Martinez", email: "ana@mail.com", pass: "ana2024", tipo: "cliente", puntos: 50, descuento: 0, historial: [], carrito: [], wishlist: [], direcciones: [], metodoPago: [], activo: false, intentos: 3, bloqueado: true, ultimoLogin: null, createdAt: "2023-04-01", updatedAt: "2023-07-10" },
    { id: 5, nombre: "Carlos Ruiz", email: "carlos@mail.com", pass: "carlos99", tipo: "cliente", puntos: 300, descuento: 15, historial: [], carrito: [], wishlist: [], direcciones: [], metodoPago: [], activo: true, intentos: 0, bloqueado: false, ultimoLogin: null, createdAt: "2023-05-01", updatedAt: "2023-08-01" }
    ],
    productos: [ 
    { id: 101, nom: "Laptop Pro 15", cat: "electronica", prec: 1200000, stock: 5, desc: "Laptop de alto rendimiento", rating: 4.5, reviews: [], vendedor: 3, imgs: ["img1.jpg", "img2.jpg"], tags: ["laptop", "computador", "pro"], activo: true, createdAt: "2023-01-15" },
    { id: 102, nom: "Mouse Inalambrico", cat: "accesorios", prec: 25000, stock: 50, desc: "Mouse ergonomico inalambrico", rating: 4.0, reviews: [], vendedor: 3, imgs: ["img3.jpg"], tags: ["mouse", "inalambrico"], activo: true, createdAt: "2023-01-20" },
    { id: 103, nom: "Teclado Mecanico RGB", cat: "accesorios", prec: 85000, stock: 20, desc: "Teclado mecanico con iluminacion RGB", rating: 4.8, reviews: [], vendedor: 3, imgs: ["img4.jpg", "img5.jpg"], tags: ["teclado", "mecanico", "rgb"], activo: true, createdAt: "2023-02-01" },
    { id: 104, nom: "Monitor 4K 27\"", cat: "electronica", prec: 450000, stock: 8, desc: "Monitor 4K con HDR", rating: 4.6, reviews: [], vendedor: 3, imgs: ["img6.jpg"], tags: ["monitor", "4k"], activo: true, createdAt: "2023-02-15" },
    { id: 105, nom: "Auriculares Bluetooth", cat: "audio", prec: 75000, stock: 30, desc: "Auriculares con cancelacion de ruido", rating: 4.3, reviews: [], vendedor: 3, imgs: ["img7.jpg"], tags: ["auriculares", "bluetooth"], activo: true, createdAt: "2023-03-01" },
    { id: 106, nom: "Webcam HD 1080p", cat: "accesorios", prec: 45000, stock: 15, desc: "Webcam para videoconferencias", rating: 4.1, reviews: [], vendedor: 3, imgs: ["img8.jpg"], tags: ["webcam", "camara"], activo: true, createdAt: "2023-03-15" },
    { id: 107, nom: "SSD 1TB", cat: "almacenamiento", prec: 95000, stock: 25, desc: "SSD de alta velocidad", rating: 4.7, reviews: [], vendedor: 3, imgs: ["img9.jpg"], tags: ["ssd", "almacenamiento"], activo: true, createdAt: "2023-04-01" },
    { id: 108, nom: "Memoria RAM 16GB", cat: "componentes", prec: 65000, stock: 40, desc: "RAM DDR4 3200MHz", rating: 4.4, reviews: [], vendedor: 3, imgs: ["img10.jpg"], tags: ["ram", "memoria"], activo: true, createdAt: "2023-04-15" },
    { id: 109, nom: "Silla Gamer", cat: "muebles", prec: 350000, stock: 10, desc: "Silla ergonomica para gaming", rating: 4.2, reviews: [], vendedor: 3, imgs: ["img11.jpg"], tags: ["silla", "gamer"], activo: false, createdAt: "2023-05-01" },
    { id: 110, nom: "Hub USB-C 7 en 1", cat: "accesorios", prec: 38000, stock: 60, desc: "Hub multipuerto USB-C", rating: 3.9, reviews: [], vendedor: 3, imgs: ["img12.jpg"], tags: ["hub", "usb"], activo: true, createdAt: "2023-05-15" }
  ]
};
