const modal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const registroForm = document.getElementById("registroForm");
const storyModal = document.getElementById("storyModal");
const storyImg = document.getElementById("storyImg");
const reelModal = document.getElementById("reelModal");
const reelVideo = document.getElementById("reelVideo");

// Mostrar modal al entrar si no hay usuario actual
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

function generarContrasena() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let pass = "";
  for (let i = 0; i < 8; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
  return pass;
}

function iniciarSesion() {
  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  if (!emailInput || !passwordInput) { alert("Completa ambos campos."); return; }

  let usuarios = JSON.parse(localStorage.getItem("usuariosApp") || "[]");
  let usuarioExistente = usuarios.find(u => u.email === emailInput);

  if (usuarioExistente) {
    if (passwordInput === usuarioExistente.password) {
      alert(`Bienvenido de nuevo ${emailInput} ✨`);
      localStorage.setItem("usuarioActual", emailInput);
      modal.classList.remove("active");
    } else alert("Contraseña incorrecta.");
  } else alert("Usuario no registrado. Usa 'Registrarme'.");
}

function registrarme() {
  const emailInput = document.getElementById("emailReg").value.trim();
  let passwordInput = document.getElementById("passwordReg").value.trim();
  if (!emailInput) { alert("Ingresa tu correo."); return; }
  if (!passwordInput) passwordInput = generarContrasena();

  let usuarios = JSON.parse(localStorage.getItem("usuariosApp") || "[]");
  if (usuarios.find(u => u.email === emailInput)) {
    alert("Usuario ya registrado. Usa 'Iniciar Sesión'."); return;
  }

  usuarios.push({ email: emailInput, password: passwordInput });
  localStorage.setItem("usuariosApp", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActual", emailInput);
  alert(`Cuenta creada. Tu contraseña es: ${passwordInput}`);
  modal.classList.remove("active");
}

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

// Autoplay videos feed
const videos = document.querySelectorAll(".feed video");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.play(); else entry.target.pause(); });
}, { threshold: 0.7 });
videos.forEach(video => { observer.observe(video); video.addEventListener("click", () => openReel(video.src)); });

function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// Cambiar secciones con navbar
function mostrarSeccion(id, btn) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function publicarPost() {
  const archivo = document.getElementById("uploadFile").files[0];
  const descripcion = document.getElementById("postDesc").value.trim();
  const feed = document.querySelector(".feed");

  if (!archivo) {
    alert("Sube una imagen o video 📤");
    return;
  }

  // Crear nuevo post
  const nuevoPost = document.createElement("div");
  nuevoPost.classList.add("post");

  if (archivo.type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(archivo);
    img.alt = "Nueva publicación";
    nuevoPost.appendChild(img);
  } else if (archivo.type.startsWith("video/")) {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(archivo);
    video.controls = true;
    video.loop = true;
    video.muted = true;
    video.style.maxHeight = "80vh";
    nuevoPost.appendChild(video);
  }

  // Descripción
  if (descripcion) {
    const info = document.createElement("div");
    info.classList.add("info");
    info.textContent = descripcion;
    nuevoPost.appendChild(info);
  }

  // Insertar arriba en el feed
  feed.prepend(nuevoPost);

  // Resetear formulario
  document.getElementById("uploadFile").value = "";
  document.getElementById("postDesc").value = "";

  // Cerrar modal
  document.getElementById("uploadModal").classList.remove("active");

  alert("✅ Publicación creada con éxito");
}
