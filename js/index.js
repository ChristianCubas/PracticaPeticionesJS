/*Campos*/
/*Formulario Registro*/
const nombre = document.getElementById("name");
const apellido = document.getElementById("surname");
const cumple = document.getElementById("birthday");
/*Formulario Update*/
const idUsuario = document.getElementById("userID");
const nombreUsuario = document.getElementById("name_person");
const apellidoUsuario = document.getElementById("surname_person");
const cumpleUsuario = document.getElementById("birthdayUser");
/*Formulario de eliminación*/
const usuarioID = document.getElementById("idUser");

/*Formularios*/
/*Registro*/
const form = document.getElementById("register_form");
/*Actualización*/
const updateform = document.getElementById("update_form");
/*Eliminación*/
const delform = document.getElementById("delete_form");

/*Clase Usuario de ella instanciaremos objetos que posteriormente los serializaremos mediante el uso de JSON*/
class Usuario {
  constructor(nombre, apellido, fechaNac) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.fechaNac = fechaNac;
  }
}

/* Trabajo de peticiones GET, POST, PUT, DELETE */

async function getDatos() {
  try {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();

    const tabla = document.getElementById("render_data");
    tabla.innerHTML = ""; // Limpiar tabla antes de rellenar

    data.forEach((usuario) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>${usuario.fechaNac}</td>
      `;
      tabla.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

async function registerUser(usuario) {
  try {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    getDatos();
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
}

async function updateUserData(id, user) {
  try {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    getDatos();
  } catch (error) {
    console.error("Error al actualizar los datos del usuario:", error);
  }
}

async function deleteDataUser(idUser) {
  try {
    await fetch(`http://localhost:3000/users/${idUser}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    getDatos();
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
}

/*Aplicamos el paradigma de programación por eventos*/

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario = new Usuario(nombre.value, apellido.value, cumple.value);
  registerUser(usuario);

  /* Limpiar campos */
  nombre.value = "";
  apellido.value = "";
  cumple.value = "";
});

updateform.addEventListener("submit", (e) => {
  e.preventDefault();
  const idUs = idUsuario.value;
  const usuario = new Usuario(
    nombreUsuario.value,
    apellidoUsuario.value,
    cumpleUsuario.value
  );
  updateUserData(idUs, usuario);

  /* Limpiar campos */
  idUsuario.value = "";
  nombreUsuario.value = "";
  apellidoUsuario.value = "";
  cumpleUsuario.value = "";
});

delform.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = usuarioID.value;
  deleteDataUser(id);

  /* Limpiar campo */
  usuarioID.value = "";
});

/* Inicializar tabla con datos al cargar la página */
document.addEventListener("DOMContentLoaded", getDatos);
