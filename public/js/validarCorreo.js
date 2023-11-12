function validarCorreo() {
    var correo = document.getElementById("correo_institucional").value;
    var dominio = "@ucaldas.edu.co";

    if (correo === "") {
        alert("Por favor, ingrese su correo electrónico institucional.");
    } else if (correo.indexOf(dominio) === -1) {
        alert("Por favor, ingrese un correo electrónico válido.");
    } else {
        alert("Correo electrónico válido. Redirigiendo...");
        // Redirige al usuario a la página de registro.
        window.location.href = "/registro";
    }
}