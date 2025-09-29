const modal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const registroForm = document.getElementById("registroForm");
const storyModal = document.getElementById("storyModal");
const storyImg = document.getElementById("storyImg");
const reelModal = document.getElementById("reelModal");
const reelVideo = document.getElementById("reelVideo");
const uploadFile = document.getElementById("uploadFile");
const feedInicio = document.getElementById("feedInicio");
const feedPerfil = document.getElementById("feedPerfil");

// Mostrar modal si no hay usuario actual
window.addEventListener("load", () => {
  const usuarioActual = localStorage.getItem("usuarioActual");
  if (!usuarioActual) modal.classList.add("active");
});

function mostrarLogin() { loginForm.style.display = "block"; registroForm.style.display = "none"; }
function mostrarRegistro() { loginForm.style.display = "none"; registroForm.style.display = "block"; }

// Historias
function openStory(src) {
  storyImg.src = src;
  storyModal.classList.add("active");
  setTimeout(closeStory, 4000);
}
function closeStory() { storyModal.classList.remove("active"); }

// Reels
function openReel(src) {
  reelVideo.src = src;
  reelVideo.play();
  reelModal.classList.add("active");
}
function closeReel() {
  reelVideo.pause();
  reelModal.classList.remove("active");
}

// Cambiar secciones
function mostrarSeccion(id, btn) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// Función para abrir el selector de archivos desde el "+"
function triggerUpload(btn) {
  uploadFile.click();
}

// Subida de archivos
uploadFile.addEventListener("change", () => {
  const archivo = uploadFile.files[0];
  if (!archivo) return;

  // Crear post
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

  // Nombre de usuario en la publicación
  const info = document.createElement("div");
  info.classList.add("info");
  const usuario = localStorage.getItem("usuarioActual") || "Usuario";
  info.textContent = `@${usuario}`;

  nuevoPost.appendChild(contenido);
  nuevoPost.appendChild(info);

  // Agregar a Inicio y Perfil
  feedInicio.prepend(nuevoPost.cloneNode(true));
  feedPerfil.prepend(nuevoPost);

  // Limpiar input
  uploadFile.value = "";

  alert("✅ Publicación agregada a Inicio y Perfil");
});
