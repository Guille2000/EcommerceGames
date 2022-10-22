const stockProductos = [
  {
    id: 1,
    nombre: "Crash Bandicoot",
    cantidad: 1,
    desc: "Juego plataformero",
    precio: 1200,
    img: "img/Crash.jpg",
  },
  {
    id: 2,
    nombre: "Mortal Kombat X",
    cantidad: 1,
    desc: "Luchas con los mejores graficos",
    precio: 1500,
    img: "img/mortal.jpg",
  },
  {
    id: 3,
    nombre: "Pac Man",
    cantidad: 1,
    desc: "Juego plataformero",
    precio: 1570,
    img: "img/pacman.jpg",
  },
  {
    id: 4,
    nombre: "Dragon Ball Xenoverse",
    cantidad: 1,
    desc: "Vive la experiencia dragon ball",
    precio: 1000,
    img: "img/dragonball.jpg",
  },
  {
    id: 5,
    nombre: "Naruto Ninja Storm 4",
    cantidad: 1,
    desc: "La historia de Naruto",
    precio: 1200,
    img: "img/naruto.jpg",
  },
  {
    id: 6,
    nombre: "Shingeki Final Attack",
    cantidad: 1,
    desc: "Eren Jeager vuelve en formato gamer...",
    precio: 1200,
    img: "img/shingeki.jpg",
  },
  {
    id: 7,
    nombre: "League of Legends",
    cantidad: 1,
    desc: "No compres esto por tu bien",
    precio: 1400,
    img: "img/league.jpg",
  },
  {
    id: 8,
    nombre: "Call Of Duty Warzone",
    cantidad: 1,
    desc: "Dispara como nunca",
    precio: 1200,
    img: "img/callduty.jpg",
  },
  {
    id: 9,
    nombre: "Fifa 2019",
    cantidad: 1,
    desc: "Juego de futbol",
    precio: 1400,
    img: "img/fifa.jpg",
  },
  {
    id: 10,
    nombre: "Fornite",
    cantidad: 1,
    desc: "Battle Royale",
    precio: 1200,
    img: "img/fornite.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const click = document.querySelector('#click')
const procesarCompra = document.querySelector('#procesarCompra')

if(click){
  click.addEventListener('click', procesarPedido)
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito(); 
  
});


if(vaciarCarrito){
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if(procesarCompra){
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
      if(window.href  = "compra.html"){
        console.log('Hola')
        procesarPedido()
      }
    }
  });
}



stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if(contenedor){
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const item = stockProductos.find((prod) => prod.id === id);
  carrito.push(item);

  mostrarCarrito();
};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if(modalBody){
  modalBody.innerHTML = "";
  carrito.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod;
    console.log(modalBody)
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    })
  };
  
  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if(precioTotal){
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
 

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    console.log(carrito)
    
    const contenedorCompra = document.querySelector('#contenedorCompra')
    console.log(contenedorCompra);
    const { id, nombre, precio, desc, img, cantidad } = prod;
    if(contenedorCompra){
      const div = document.createElement("div");
      div.innerHTML += `
            <div class="modal-contenedor">
              <div>
              <img class="img-fluid img-carrito" src="${img}"/>
              </div>
              <div>
              <p>Producto: ${nombre}</p>
            <p>Precio: ${precio}</p>
            <p>Cantidad :${cantidad}</p>
            <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
              </div>
            </div>
            
        
            `;
      contenedorCompra.appendChild(div);
    };
    })
  }

