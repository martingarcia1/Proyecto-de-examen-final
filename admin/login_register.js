// Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

// Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

// Función para ajustar el diseño en función del tamaño de la pantalla
function anchoPage() {
    if (window.innerWidth > 850) {
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    } else {
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";
    }
}

anchoPage();

// Función para iniciar sesión
function iniciarSesion() {
    var email = document.getElementById('emailLogin').value;
    var password = document.getElementById('passwordLogin').value;

    // Obtener los datos del usuario registrado de localStorage
    var usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (usuarioRegistrado && usuarioRegistrado.email === email && usuarioRegistrado.password === password) {
        alert('Inicio de sesión exitoso.');
        // Redirigir al usuario a la página principal usuario.html
        window.location.href = 'usuario.html';
    } else {
        alert('Email o contraseña incorrectos.');
    }
}

// Función para registrar un nuevo usuario
function register() {
    var nombreCompleto = document.getElementById('nombreCompleto').value;
    var email = document.getElementById('emailRegistro').value;
    var usuario = document.getElementById('usuario').value;
    var password = document.getElementById('passwordRegistro').value;

    // Guardar los datos del usuario en localStorage
    localStorage.setItem("usuarioRegistrado", JSON.stringify({email, password}));

    
}


