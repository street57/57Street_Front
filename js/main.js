// PRODUCTOS
const productos = [
  // Buzos
  {
    id: "buzo-01",
    titulo: "Buzo 01",
    imagen: "./img/abrigos/01.jpg",
    categoria: {
      nombre: "Buzos",
      id: "buzos",
    },
    precio: 1000,
  },
  {
    id: "buzo-02",
    titulo: "Buzo 02",
    imagen: "./img/abrigos/02.jpg",
    categoria: {
      nombre: "Buzos",
      id: "buzos",
    },
    precio: 1000,
  },
  {
    id: "buzo-03",
    titulo: "Buzo 03",
    imagen: "./img/abrigos/03.jpg",
    categoria: {
      nombre: "Buzos",
      id: "buzos",
    },
    precio: 1000,
  },
  {
    id: "buzo-04",
    titulo: "Buzo 04",
    imagen: "./img/abrigos/04.jpg",
    categoria: {
      nombre: "Buzos",
      id: "buzos",
    },
    precio: 1000,
  },
  {
    id: "buzo-05",
    titulo: "Buzo 05",
    imagen: "./img/abrigos/05.jpg",
    categoria: {
      nombre: "Buzos",
      id: "buzos",
    },
    precio: 1000,
  },
  // Camisetas
  {
    id: "camiseta-01",
    titulo: "Camiseta 01",
    imagen: "./img/camisetas/01.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 1000,
  },
  {
    id: "camiseta-02",
    titulo: "Camiseta 02",
    imagen: "./img/camisetas/02.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 1000,
  },
  {
    id: "camiseta-03",
    titulo: "Camiseta 03",
    imagen: "./img/camisetas/03.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 1000,
  },
  {
    id: "camiseta-04",
    titulo: "Camiseta 04",
    imagen: "./img/camisetas/04.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 1000,
  },
  {
    id: "camiseta-05",
    titulo: "Camiseta 05",
    imagen: "./img/camisetas/05.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 1000,
  },
  {
    id: "camiseta-06",
    titulo: "Camiseta 06",
    imagen: "./img/camisetas/06.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 1000,
  },
  {
    id: "camiseta-07",
    titulo: "Camiseta 07",
    imagen: "./img/camisetas/07.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 1000,
  },
  {
    id: "camiseta-08",
    titulo: "Camiseta 08",
    imagen: "./img/camisetas/08.jpg",
    categoria: {
      nombre: "Camisetas",
      id: "camisetas",
    },
    precio: 1000,
  },
  // Pantalones
  {
    id: "pantalon-01",
    titulo: "Pantalón 01",
    imagen: "./img/pantalones/01.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
  {
    id: "pantalon-02",
    titulo: "Pantalón 02",
    imagen: "./img/pantalones/02.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
  {
    id: "pantalon-03",
    titulo: "Pantalón 03",
    imagen: "./img/pantalones/03.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
  {
    id: "pantalon-04",
    titulo: "Pantalón 04",
    imagen: "./img/pantalones/04.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
  {
    id: "pantalon-05",
    titulo: "Pantalón 05",
    imagen: "./img/pantalones/05.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
  {
    id: "pantalon-05",
    titulo: "Pantalón 05",
    imagen: "./img/pantalones/05.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
  {
    id: "pantalon-05",
    titulo: "Pantalón 05",
    imagen: "./img/pantalones/05.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones",
    },
    precio: 1000,
  },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
            <button class="producto-detalle" id="${producto.id}"><a href="../admin/Detalle_Producto/detalle_producto.html">Detalle</a></button>
        </div>
`;

    contenedorProductos.append(div);
  });
  actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      tituloPrincipal.innerText = productoCategoria.categoria.nombre;

      const productosBoton = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );
      cargarProductos(productosBoton);
    } else {
      tituloPrincipal.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".producto-agregar");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
  });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");
if (productosEnCarritoLS) {
  productosEnCarrito = JSON.parse(productosEnCarritoLS);
  actualizarNumerito();
} else {
  productosEnCarrito = [];
}
function agregarAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAgregado = productos.find(
    (producto) => producto.id === idBoton
  );

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAgregado.cantidad = 1;
    productosEnCarrito.push(productoAgregado);
  }

  actualizarNumerito();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumerito() {
  let nuevoNumerito = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numerito.innerText = nuevoNumerito;
}

function validateSesion() {
  const usuario = SessionUtils.getUsuario();
  if (usuario.nombres == "ANONIMO") {
    document.getElementById("cerrarSesion").classList.add("d-none");
    document.getElementById("iniciarSesion").classList.remove("d-none");
  } else {
    document.getElementById("cerrarSesion").classList.remove("d-none");
    document.getElementById("iniciarSesion").classList.add("d-none");
    // Añadimos el nombre al titulo
    const header = document.querySelector("#headerMenu");
    header.innerHTML = `${header.innerHTML} <p>${usuario.fullName}</p>`;
  }
 }

function goToIniciarSesion() {
  window.location.href = "http://127.0.0.1:5501/login.html";
}

validateSesion();
