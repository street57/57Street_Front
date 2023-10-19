const $btnSignIn = document.querySelector(".sign-in-btn"),
      $btnSignUp = document.querySelector(".sign-up-btn"),
      $signIn = document.querySelector(".sign-in"),
      $signUp = document.querySelector(".sign-up");

document.addEventListener('click', e =>{
    if(e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active');
    }
})

function registrarUsuario () {
    const infoUsuario = {
        nombre: $("#nombre").val(),
        apellidos: $("#apellidos").val(),
        correo: $("#correo").val(),
        celular: $("#celular").val(),
        clave: $("#clave").val(),
        validarClave: $("#validarClave").val()
    }
    if (!validForm(infoUsuario)) {
        alert("Diligencie los campos.")
        return;
    }
    debugger;
    const cumpleValidacionClave = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,20}$/.test(infoUsuario.clave);
    if (infoUsuario.clave && !cumpleValidacionClave){
        alert("La clave debe tener al menos entre 8 y 20 caracteres, un dígito, una letra minúscula y una letra mayúscula.")
        return;
    }
    if (infoUsuario.clave != infoUsuario.validarClave){
        alert("La clave debe coincidir.")
        return;
    }
    $.ajax({
        type: 'post',
        url: 'http://localhost:9080/api/v1/usuario-sistema/Insert',
        data: JSON.stringify(infoUsuario),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
            alert("Usuario registrado con exito")
        },
        error: function(xhr, status, error) {
            const err = JSON.parse(xhr.responseText);
            if (err.status == 400) {
                alert("El usuario ya se encuentra registrado");
                return;
            }
            alert(err.message);
        },
    });
};

function loginUsuario  () {
    const infoLogin = {
        email: $("#correoLogin").val(),
        clave: $("#claveLogin").val(),
    }
    if (!validForm(infoLogin)) {
        alert("Diligencie los campos.")
        return;
    }
    $.ajax({
        type: 'post',
        url: 'http://localhost:9080/api/v1/login/login',
        data: JSON.stringify(infoLogin),
        contentType: "application/json; charset=utf-8",
        traditional: true,
        success: function (data) {
            SessionUtils.setUsuarioSession(data);
            SessionUtils.setToken(data.token);
            window.location.href = "http://127.0.0.1:5501";
        },
        error: function(xhr, status, error) {
            const err = JSON.parse(xhr.responseText);
            if (err.status == 400) {
                alert("El usuario no se encuentra registrado");
                return;
            }
            alert(err.message);
        },
    });
}


function validForm(data) {
    for (const value of Object.values(data)) {
        if (!value || value == "") {
            return false;
        }
    }
    return true;
}