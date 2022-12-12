class UsuarioSession {
    constructor(usuarioStorage) {
        this.idUsuario = usuarioStorage.idUsuario;
        this.idTipoUsuario = usuarioStorage.idTipoUsuario;
        this.nombres = usuarioStorage.nombres;
        this.apellidos = usuarioStorage.apellidos;
        this.correo = usuarioStorage.correo;
        this.celular = usuarioStorage.celular;
    }

    static NoUsuario() {
        const usuarioStorage = {
            idUsuario: 0,
            idTipoUsuario: 0,
            nombres: "ANONIMO",
            apellidos: "",
            correo: "",
            celular: "",
        }
        return new UsuarioSession(usuarioStorage)
    }

    get fullName() {
        return [this.nombres, this.apellidos].join(' ');
    }

}

const NameItemStorage = {
    USUARIO: "usuario",
    TOKEN: "token",
    ROLES: "grants",
}

/**
 * Clase a exportar que contiene los métodos definidos.
 */
var SessionUtils = {
    getRoles,
    getToken,
    getUsuario,
    hasRole,
    setRoles,
    setToken,
    setUsuarioSession,
    signOff,
}

/**
 * Método encargado de recuperar los recursos con los que cuenta el usuario.
 * @returns {Array<String>} lista de recursos del usuario en sesión.
 */
function getRoles() {
    if (isLocalStorageAvailable()) {
        return localStorage.getItem(NameItemStorage.ROLES) || [];
    }
    return [];
}

/**
 * Método encargado de recuperar el token del usuario en sesión.
 * @returns {String} token del usuario en sesión.
 */
function getToken() {
    return JSON.parse(localStorage.getItem(NameItemStorage.TOKEN)) || null;
}

/**
 * Método encargado de recuperar la información del usuario en sesión.
 * @returns {UsuarioSession} información del usuario en sesión.
 */
function getUsuario() {
    const usuarioStorage = JSON.parse(localStorage.getItem(NameItemStorage.USUARIO));
    if (usuarioStorage) {
        return new UsuarioSession(usuarioStorage);
    }
    return UsuarioSession.NoUsuario();
}

/**
 * Método encargado de validar si el usuario tiene el recurso necesario.
 * @param {string} role recurso a validar
 * @returns si el usuario cuenta con el recurso.
 */
function hasRole(role) {
    return SessionUtils.getRoles().includes(role);
}

/**
 * Método encargado de almacenar los roles.
 * @param {Array<string>} roles lista de recursos con los que cuenta el usuario
 */
function setRoles(roles) {
    localStorage.setItem(NameItemStorage.ROLES, roles);
}

/**
 * Método encargado de almacenar el token en el localStorage.
 * @param {string} token token de autenticación del usuario.
 */
function setToken(token) {
    localStorage.setItem(NameItemStorage.TOKEN, token);
}

/**
 * Método encargado de almacenar un usuario en el localStorage.
 * @param {UsuarioSession} usuarioSession usuario registrado del sistema.
 */
function setUsuarioSession(usuarioSession) {
    localStorage.setItem(NameItemStorage.USUARIO, JSON.stringify(new UsuarioSession(usuarioSession)));
}

/**
 * Método encargado de eliminar la información de un usuario al cerrar sesión.
 */
function signOff() {
    localStorage.removeItem(NameItemStorage.USUARIO);
    localStorage.removeItem(NameItemStorage.TOKEN);
    localStorage.removeItem(NameItemStorage.ROLES);
    localStorage.removeItem("productos-en-carrito");
    window.location.href = "http://127.0.0.1:5500";
}

/**
 * Método encargado de validar si el localStorage esta disponible
 * @returns verdadero si esta disponible el localStorage, falso si esta bloqueado.
 */
function isLocalStorageAvailable() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}