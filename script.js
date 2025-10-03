// Modal Login/Registro
const modal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const registroForm = document.getElementById("registroForm");

window.addEventListener("load", () => {
  const usuarioActual = localStorage.getItem("usuarioActual");
  if (!usuarioActual) modal.classList.add("active");
});

// Mostrar Login/Registro
function mostrarLogin() { loginForm.style.display = "block"; registroForm.style.display = "none"; }
function mostrarRegistro() { loginForm.style.display = "none"; registroForm.style.display = "block"; }

// Generar contraseña automática
function generarContrasena() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let pass = "";
  for (let i = 0; i < 8; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
  return pass;
}

// Iniciar sesión
function iniciarSesion() {
  const emailInput = document.getElementById("email").value.trim();
  const passwordInput = document.getElementById("password").value.trim();
  if (!emailInput || !passwordInput) { alert("Completa ambos campos."); return; }

  let usuarios = JSON.parse(localStorage.getItem("usuariosApp") || "[]");
  let usuarioExistente = usuarios.find(u => u.email === emailInput);

  if (usuarioExistente) {
    if (passwordInput === usuarioExistente.password) {
      localStorage.setItem("usuarioActual", emailInput);
      document.getElementById("usuarioNick").textContent = usuarioExistente.nick;
      modal.classList.remove("active");
    } else alert("Contraseña incorrecta.");
  } else alert("Usuario no registrado.");
}

// Registrarse
function registrarme() {
  const emailInput = document.getElementById("emailReg").value.trim();
  let passwordInput = document.getElementById("passwordReg").value.trim();
  const nickInput = document.getElementById("nickReg").value.trim();

  if (!emailInput || !nickInput) { alert("Correo y nick obligatorios."); return; }
  if (!passwordInput) passwordInput = generarContrasena();

  let usuarios = JSON.parse(localStorage.getItem("usuariosApp") || "[]");
  if (usuarios.find(u => u.email === emailInput)) { alert("Usuario ya registrado."); return; }

  usuarios.push({ email: emailInput, password: passwordInput, nick: nickInput });
  localStorage.setItem("usuariosApp", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActual", emailInput);
  document.getElementById("usuarioNick").textContent = nickInput;
  modal.classList.remove("active");
  alert(`Cuenta creada. Tu contraseña: ${passwordInput}`);
}

// Navbar inferior
function mostrarSeccion(id, btn) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// Subida de publicaciones
function triggerUpload() { document.getElementById("uploadFile").click(); }
const uploadInput = document.getElementById("uploadFile");

uploadInput.addEventListener("change", () => {
  const archivo = uploadInput.files[0];
  if (!archivo) return;
  agregarPost(archivo);
  agregarPostPerfil(archivo);
  uploadInput.value = "";
});

// Feed Inicio
const feedInicio = document.getElementById("feedInicio");

function agregarPost(archivo) {
  const post = document.createElement("div");
  post.className = "post";

  let media;
  if (archivo.type.startsWith("image/")) media = document.createElement("img");
  else if (archivo.type.startsWith("video/")) media = document.createElement("video");

  media.src = URL.createObjectURL(archivo);
  media.classList.add("post-media");
  if (archivo.type.startsWith("video/")) {
    media.autoplay = true;
    media.muted = true;
    media.loop = true;
    media.controls = false; // sin descarga
  }
  post.appendChild(media);

  const actions = document.createElement("div");
  actions.className = "post-actions";
  actions.innerHTML = `
    <button onclick="alert('❤️ Me gusta')">❤️</button>
    <button onclick="alert('💬 Comentar')">💬</button>
    <button onclick="alert('↪️ Compartir')">↪️</button>
  `;
  post.appendChild(actions);

  feedInicio.prepend(post);
}

// Feed Perfil estilo TikTok
const feedPerfil = document.getElementById("feedPerfil");
function agregarPostPerfil(archivo) {
  const post = document.createElement("div");
  post.className = "post";

  let media;
  if (archivo.type.startsWith("image/")) media = document.createElement("img");
  else if (archivo.type.startsWith("video/")) media = document.createElement("video");

  media.src = URL.createObjectURL(archivo);
  media.classList.add("post-media");
  if (archivo.type.startsWith("video/")) {
    media.autoplay = true;
    media.muted = true;
    media.loop = true;
    media.controls = false; // sin descarga
  }
  post.appendChild(media);

  const actions = document.createElement("div");
  actions.className = "post-actions";
  actions.innerHTML = `
    <button onclick="alert('❤️ Me gusta')">❤️</button>
    <button onclick="alert('💬 Comentar')">💬</button>
    <button onclick="alert('↪️ Compartir')">↪️</button>
  `;
  post.appendChild(actions);
  feedPerfil.prepend(post);
}

// Reproducir solo videos visibles en perfil
feedPerfil.addEventListener("scroll", () => {
  const videos = feedPerfil.querySelectorAll("video");
  videos.forEach(video => {
    const rect = video.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) video.play();
    else video.pause();
  });
});

// Historias
const storyModal = document.getElementById("storyModal");
const storyImg = document.getElementById("storyImg");
function openStory(src) {
  storyImg.src = src;
  storyModal.classList.add("active");
  setTimeout(() => storyModal.classList.remove("active"), 4000);
}
