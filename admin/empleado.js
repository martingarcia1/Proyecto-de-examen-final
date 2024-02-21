function guardarDatosLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar));
}

function recuperarDatosLocal(llave) {
    try {
        const datos = JSON.parse(localStorage.getItem(llave)) || [];
        return datos;
    } catch (error) {
        console.error('Error al recuperar datos del localStorage:', error);
        return [];
    }
}

let productos = recuperarDatosLocal('productos') || [];
let mensaje = document.getElementById('mensaje');

// Añadir Productos
const añadirProducto = document.getElementById('productoAñadir');
const añadirValor = document.getElementById('valorAñadir');
const añadirExistencia = document.getElementById('existenciaAñadir');
const añadirImagen = document.getElementById('ImagenAñadir');

document.getElementById("botonAñadir").addEventListener("click", function (event) {
    event.preventDefault();
    let productoAñadir = añadirProducto.value;
    let valorAñadir = añadirValor.value;
    let existenciaAñadir = añadirExistencia.value;
    let imagenAñadir = añadirImagen.value;

    let van = true;

    if (productoAñadir === '' || valorAñadir === '' || existenciaAñadir === '' || imagenAñadir === '') {
        mensaje.classList.add('llenarCampos');
        setTimeout(() => { mensaje.classList.remove('llenarCampos'); },   2500);
        van = false;
    } else {
        for (let i =   0; i < productos.length; i++) {
            if (productos[i].nombre === productoAñadir) {
                mensaje.classList.add('repetidoError');
                setTimeout(() => { mensaje.classList.remove('repetidoError'); },   2500);
                van = false;
            }
        }
    }

    if (van) {
        productos.push({
            id: Date.now(),
            nombre: productoAñadir,
            valor: valorAñadir,
            existencia: existenciaAñadir,
            urlImagen: imagenAñadir
        });
        mensaje.classList.add('realizado');
        setTimeout(() => {
            mensaje.classList.remove('repetidoError');
           
            // window.location.reload();
        },   1500);
    }
    guardarDatosLocal('productos', productos);
});

// EDITAR
const productoEd = document.getElementById('productoEditar');
const atributoEd = document.getElementById('atributoEditar');
const nuevoAtributoEd = document.getElementById('nuevoValor');

document.getElementById("botonEditar").addEventListener("click", function (event) {
    event.preventDefault()
    let productoEditar = productoEd.value
    let atributoEditar = atributoEd.value
    let nuevoAtributo = nuevoAtributoEd.value
    let van = false
    if (productoEditar == '' || atributoEditar == '' || nuevoAtributo == '') {
        mensaje.classList.add('llenarCampos')
        setTimeout(() => { mensaje.classList.remove('llenarCampos') }, 2500)
    }
    else {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre == productoEditar) {
                productos[i][atributoEditar] = nuevoAtributo
                van = true
            }
        }
        if (van == true) {
            mensaje.classList.add('realizado')
            setTimeout(() => {
                mensaje.classList.remove('realizado')
                window.location.reload()
            }, 1500);
        }
        else {
            mensaje.classList.add('noExisteError')
            setTimeout(() => { mensaje.classList.remove('noExsiteError') }, 2500);
        }
        guardarDatosLocal('productos', productos);
    }
});


// ELIMINAR
const productoE = document.getElementById('productoEliminar');

document.getElementById("botonEliminar").addEventListener("click", function (event) {
    event.preventDefault();
    let productoEliminar = productoE.value;
    let van = false;

    for (let i = productos.length -  1; i >=  0; i--) {
        if (productos[i].nombre === productoEliminar) { 
            productos.splice(i,  1);
            van = true;
            break; 
        }
    }

    if (!van) {
        mensaje.classList.add('noExisteError');
        setTimeout(() => { mensaje.classList.remove('noExisteError'); },  2500);
    } else {
        mensaje.classList.add('realizado');
        setTimeout(() => {
            mensaje.classList.remove('realizado');
           
            // window.location.reload();
        },  1500);
    }
    guardarDatosLocal('productos', productos);
});

// MOSTRAR
window.addEventListener("load", () => {
    const productoEd = document.getElementById('productoEditar');
    const productoEl = document.getElementById('productoEliminar');

    for (let i =  0; i < productos.length; i++) {
        productoEd.innerHTML += `<option value="${productos[i].nombre}">${productos[i].nombre}</option>`;
        productoEl.innerHTML += `<option value="${productos[i].nombre}">${productos[i].nombre}</option>`;
    }

    Object.keys(productos[0]).forEach(element => {
        atributoEd.innerHTML += `<option>${element}</option>`;
    });

    let mostrarProductos = document.getElementById('mostrarProductos');
    mostrarProductos.innerHTML = '';

    for (let i =   0; i < productos.length; i++) {
        let productoDiv = document.createElement('div');
        productoDiv.classList.add('contenedorProductos');

        let img = document.createElement('img');
        img.src = productos[i].urlImagen;
        img.alt = productos[i].nombre;

        let infoDiv = document.createElement('div');
        infoDiv.classList.add('informacion');

        let pNombre = document.createElement('p');
        pNombre.textContent = productos[i].nombre;

        let pPrecio = document.createElement('p');
        pPrecio.classList.add('precio');
        pPrecio.innerHTML = `<span>Precio: ${productos[i].valor}$</span>`;

        let pExistencia = document.createElement('p');
        pExistencia.textContent = `Existencia: ${productos[i].existencia}`;

        infoDiv.appendChild(pNombre);
        infoDiv.appendChild(pPrecio);
        infoDiv.appendChild(pExistencia);

        productoDiv.appendChild(img);
        productoDiv.appendChild(infoDiv);

        mostrarProductos.appendChild(productoDiv);
    }
});