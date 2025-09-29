const uploadFile = document.getElementById("uploadFile");
const feedInicio = document.getElementById("feedInicio");
const feedPerfil = document.getElementById("feedPerfil");

// Abrir selector de archivos desde "+"
function triggerUpload() {
  uploadFile.click();
}

// Cuando se selecciona archivo
uploadFile.addEventListener("change", () => {
  const archivo = uploadFile.files[0];
  if (!archivo) return;

  const nuevoPost = document.createElement("div");
  nuevoPost.classList.add("post");

  let contenido;
  if (archivo.type.startsWith("image/")) {
    contenido = document.createElement("img");
    contenido.src = URL.createObjectURL(archivo);
  } else if (archivo.type.startsWith("video/")) {
    contenido = document.createElement("video");
    contenido.src = URL.createObjectURL(archivo);
    contenido.muted = true;
    contenido.loop = true;
    contenido.autoplay = true;
  }

  const info = document.createElement("div");
  info.classList.add("info");
  const usuario = localStorage.getItem("usuarioActual") || "Usuario";
  info.textContent = `@${usuario}`;

  nuevoPost.appendChild(contenido);
  nuevoPost.appendChild(info);

  // Agregar post a Inicio y Perfil
  feedInicio.prepend(nuevoPost.cloneNode(true));
  feedPerfil.prepend(nuevoPost);

  // Limpiar input
  uploadFile.value = "";

  alert("✅ Publicación agregada a Inicio y Perfil");
});

// Función para cambiar secciones con navbar
function mostrarSeccion(id, btn) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}
