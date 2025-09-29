const modal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const registroForm = document.getElementById("registroForm");
const storyModal = document.getElementById("storyModal");
const storyImg = document.getElementById("storyImg");
const reelModal = document.getElementById("reelModal");
const reelVideo = document.getElementById("reelVideo");

// Mostrar modal si no hay usuario actual
window.addEventListener("load", () => {
  const usuarioActual = localStorage.getItem("usuarioActual");
  if (!usuarioActual) modal.classList.add("active");
});

function mostrarLogin() {
  loginForm.style.display = "block";
  registroForm.style.display = "none";
}
function mostrarRegistro() {
  loginForm.style.display = "none";
  registroForm.style.display = "block";
}

// Funciones de login y registro...
// (Mantener las mismas que ya tienes)

function openStory(src) {
  storyImg.src = src;
  storyModal.classList.add("active");
  setTimeout(closeStory, 4000);
}
function closeStory() { storyModal.classList.remove("active"); }

function openReel(src) {
  reelVideo.src = src;
  reelVideo.play();
  reelModal.classList.add("active");
}
function closeReel() {
  reelVideo.pause();
  reelModal.classList.remove("active");
}

// Autoplay videos feed
const videos = document.querySelectorAll(".feed video");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { 
    if (entry.isIntersecting) entry.target.play(); 
    else entry.target.pause(); 
  });
}, { threshold: 0.7 });
videos.forEach(video => { 
  observer.observe(video); 
  video.addEventListener("click", () => openReel(video.src)); 
});

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

function mostrarSeccion(id, btn) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// ** NUEVO: Subida automática en un solo clic **
const uploadBtn = document.getElementById("uploadBtn");
const uploadFile = document.getElementById("uploadFile");
const previewArea = document.getElementById("previewArea");
const feed = document.querySelector(".feed");

uploadBtn.addEventListener("click", () => {
  uploadFile.click();
});

uploadFile.addEventListener("change", () => {
  const archivo = uploadFile.files[0];
  if (!archivo) return;

  // Vista previa
  previewArea.innerHTML = "";
  let element;
  if (archivo.type.startsWith("image/")) {
    element = document.createElement("img");
    element.src = URL.createObjectURL(archivo);
    element.style.maxWidth = "90%";
  } else if (archivo.type.startsWith("video/")) {
    element = document.createElement("video");
    element.src = URL.createObjectURL(archivo);
    element.controls = true;
    element.style.maxWidth = "90%";
    element.style.maxHeight = "60vh";
  }
  previewArea.appendChild(element);

  // Publicar automáticamente en el feed
  const nuevoPost = document.createElement("div");
  nuevoPost.classList.add("post");
  nuevoPost.appendChild(element.cloneNode(true));

  // Insertar arriba en el feed
  feed.prepend(nuevoPost);

  // Limpiar input para poder subir nuevamente
  uploadFile.value = "";
  previewArea.innerHTML = "";

  alert("✅ Publicación agregada automáticamente");
});
