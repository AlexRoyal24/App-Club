const modal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const registroForm = document.getElementById("registroForm");
const storyModal = document.getElementById("storyModal");
const storyImg = document.getElementById("storyImg");

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

// Navbar inferior
function mostrarSeccion(id, btn) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// Activar subida de archivo desde el botón +
function triggerUpload() {
  document.getElementById("uploadFile").click();
}

// Subir publicación
const uploadInput = document.getElementById("uploadFile");
uploadInput.addEventListener("change", () => {
  const archivo = uploadInput.files[0];
  if (!archivo) return;

  agregarPost(archivo);
  uploadInput.value = ""; // reset
});

function agregarPost(archivo) {
  const feeds = [document.getElementById("feedInicio"), document.getElementById("feedPerfil")];

  feeds.forEach(feed => {
    const post = document.createElement("div");
    post.className = "post";

    let media;
    if (archivo.type.startsWith("image/")) {
      media = document.createElement("img");
      media.src = URL.createObjectURL(archivo);
    } else if (archivo.type.startsWith("video/")) {
      media = document.createElement("video");
      media.src = URL.createObjectURL(archivo);
      media.controls = true;
      media.loop = true;
      media.muted = true;
      media.style.maxHeight = "400px"; // tamaño tipo Instagram
    }
    media.classList.add("post-media");
    post.appendChild(media);

    // Botones tipo Instagram
    const actions = document.createElement("div");
    actions.className = "post-actions";
    actions.innerHTML = `
      <button onclick="alert('Te gustó ❤️')">❤️</button>
      <button onclick="alert('Comentar 💬')">💬</button>
      <button onclick="alert('Compartir ↪️')">↪️</button>
      <button onclick="verDeNuevo(this)">👁 Ver de nuevo?</button>
    `;
    post.appendChild(actions);

    feed.prepend(post);
  });
}

// Ver de nuevo (abre modal o resalta)
function verDeNuevo(btn) {
  const post = btn.closest(".post");
  const media = post.querySelector("video, img");
  if (media.tagName === "VIDEO") {
    media.currentTime = 0;
    media.play();
  }
}
