 function validarContrasena() {
    var password = document.getElementById("contrasena")
       , confirm_password = document.getElementById("confirm_contrasena");
   
    function validatePassword() {
       if (password.value !== confirm_password.value) {
         confirm_password.setCustomValidity("Las contraseñas no coinciden");
       } else {
         confirm_password.setCustomValidity('');
       }
    }
   
    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
   }