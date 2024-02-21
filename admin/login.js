function loguear() {
    const user = document.getElementById('usuario').value;
    const pass = document.getElementById('clave').value;
    
    if(user == 'admin' && pass == '1234') {
     
     window.location = 'menu.html';
    } else if (user == 'empleado' && pass == 'emple1234') {
     
     window.location = 'empleado.html';
    } else {
     alert("Credenciales incorrectas. Inténtalo de nuevo");
    };
   if (user == 'usuario' && pass == '12345'){
    window.location = 'usuario.html'
   }
   else{
    alert("acceso denegado");
   }
}