function guardarDatosLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar));
}
  
function recuperarDatosLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave)) || [];
    return datos;
}
  
let productos = recuperarDatosLocal('productos') || [];
let lista = [];
let valortotal =  0;
  
const informacionCompra = document.getElementById('informacionCompra');
const contenedorCompra = document.getElementById('contenedorCompra');
const productosCompra = document.getElementById('productosCompra');
const contenedorProductos = document.getElementById('contenedorProductos');
const carrito = document.getElementById('carrito');
const numero = document.getElementById('numeroProductos');
const header = document.getElementById('header');
const total = document.getElementById('totalCompra');
const body = document.body;
const x = document.getElementById('cerrarCarrito');
  
window.addEventListener("scroll", function () {
    if (contenedorProductos.getBoundingClientRect().top <  10) {
        header.classList.add("scroll");
    } else {
        header.classList.remove("scroll");
    }
});
  
  window.onload = function() {
    visualizarProductos();
    contenedorCompra.classList.add("none");
}
  
function visualizarProductos() {
    contenedorProductos.innerHTML = "";
for (let i =  0; i < productos.length; i++) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        img.src = productos[i].urlImagen;
        div.appendChild(img);
    
        let informacion = document.createElement('div');
        informacion.className = 'informacion';
        let pNombre = document.createElement('p');
        pNombre.textContent = productos[i].nombre;
        informacion.appendChild(pNombre);
    
    let pPrecio = document.createElement('p');
        pPrecio.className = 'precio';
        pPrecio.textContent = `$${productos[i].valor}`;
        informacion.appendChild(pPrecio);
        if (productos[i].existencia >  0) {
            let button = document.createElement('button');
            button.textContent = 'Comprar';
            button.addEventListener('click', function() { comprar(i); });
            informacion.appendChild(button);
        } else {
            let pSoldOut = document.createElement('p');
            pSoldOut.className = 'soldOut';
            pSoldOut.textContent = 'Sold Out';
            informacion.appendChild(pSoldOut);
        }
        div.appendChild(informacion);
        contenedorProductos.appendChild(div);
    }
}
  
function comprar(indice) {
    if (productos[indice].existencia >  0) {
      lista.push({ nombre: productos[indice].nombre, precio: productos[indice].valor });
      productos[indice].existencia -=  1;
      guardarDatosLocal("productos", productos);
      numero.innerHTML = lista.length;
      numero.classList.add("diseñoNumero");
      if (productos[indice].existencia ===  0) {
        visualizarProductos();
      }
    } else {
      console.error('Producto agotado');
    }
    return lista;
}
  
carrito.addEventListener("click", function () {
    body.style.overflow = "hidden";
    contenedorCompra.classList.remove('none');
    contenedorCompra.classList.add('contenedorCompra');
    informacionCompra.classList.add('informacionCompra');
    mostrarElementosLista();
});
  
function mostrarElementosLista() {
    productosCompra.innerHTML = "";
    valortotal =  0; 
    for (let i =  0; i < lista.length; i++) {
        const producto = productos.find(p => p.nombre === lista[i].nombre);
        if (producto) {
            productosCompra.innerHTML += `<div><div class="img"><button onclick="eliminar(${i})" class="botonTrash"><img src="${producto.urlImagen}"></button><p>${lista[i].nombre}</p></div><p>$${lista[i].precio}</p></div>`;
            valortotal += parseFloat(lista[i].precio);
        }
    }
    total.innerHTML = `<p>Valor Total</p> <p><span>$${valortotal.toFixed(2)}</span></p>`; 
}
  
function eliminar(indice) {
    productos[indice].existencia +=  1;
    lista.splice(indice,  1);
    guardarDatosLocal("productos", productos);
    numero.innerHTML = lista.length;
    if (lista.length ===  0) {
        numero.classList.add("diseñoNumero");
    }
    visualizarProductos();
    mostrarElementosLista();
}
  
x.addEventListener("click", function () {
    body.style.overflow = "auto";
    contenedorCompra.classList.add('none');
    contenedorCompra.classList.remove('contenedorCompra');
    informacionCompra.classList.remove('informacionCompra');
});

function final(){
	alert("compra exitosa")

	const nombreUsuario = localStorage.getItem('nombreUsuario');
	console.log('Nombre del usuario:', nombreUsuario);
}

  