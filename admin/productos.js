//Dfinición de variables
const url = "http://localhost:3000/api/articulos/";
const contenedor1 = document.querySelector("tbody");
let resultados = "";

const modalArticulo = new bootstrap.Modal(
  document.getElementById("modalArticulo")
);
const formArticulo = document.querySelector("form");
const producto = document.getElementById("producto");
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");

let opcion = "";

btnCrear.addEventListener("click", () => {
  producto.value = "";
  descripcion.value = "";
  precio.value = "";
  stock.value = "";
  modalArticulo.show();
});

//Función para mostrar los resultados
const mostrar = (articulos) => {
  array.forEach((articulo) => {
    resultados += `<tr>
                            <td>${articulo.id}</td>
                            <td>${articulo.producto}</td>
                            <td>${articulo.descripcion}</td>
                            <td>${articulo.precio}</td>
                            <td>${articulo.stock}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-primary">Borrar</a></td>
                       </tr>
                      `;
  });
  contenedor1.innerHTML = resultados;
};

//Procedimiento Mostrar
fetch(url)
  .then((response) => response.json())
  .then((data) => mostrar(data))
  .catch((error) => console.log(error));

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

//Procedimiento borrar
on(document, "click", "btnBorrar", (e) => {
  const fila = e.target.parentNode.parentNode;
  const id = fila.firsElementChild.innerHTML;
  alertify.confirm(
    "This is a confirm dialog.",
    function () {
      fetch(url + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => location.reload());
      //alertify.success('Ok');
    },
    function () {
      alertify.error("Cancel");
    }
  );
});

//Procedimineto editar

let idForm = 0;

on(document, "click", "btnEditar", (e) => {
  const fila = e.target.parentNode.parentNode;
  idForm = fila.children[0].innerHTML;
  const productoForm = fila.children[1].innerHTML;
  const descripcionForm = fila.children[2].innerHTML;
  const precioForm = fila.children[3].innerHTML;
  const stocktoForm = fila.children[4].innerHTML;

  producto.value = productoForm;
  descripcion.value = descripcionForm;
  precio.value = precioForm;
  stock.value = stocktoForm;
  opcion = "editar";
  modalArticulo.show();
});

//Porcedimiento para crear o editar
formArticulo.addEventListener("submit", (e) => {
  e.preventDefault();
  if (opcion == "crear") {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        producto: producto.value,
        descripcion: descripcion.value,
        precio: precio.value,
        stock: stock.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const nuevoArticulo = [];
        nuevoArticulo.push(data);
        mostrar(nuevoArticulo);
      });
  }
  if (opcion == "editar") {
    fetch(url + idForm, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        producto: producto.value,
        descripcion: descripcion.value,
        precio: precio.value,
        stock: stock.value,
      }),
    })
      .then((response) => response.json())
      .then((response) => location.reload());
  }
  modalArticulo.hide();
});
