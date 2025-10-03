// Modales y formularios
const modal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const registroForm = document.getElementById("registroForm");
const storyModal = document.getElementById("storyModal");
const storyImg = document.getElementById("storyImg");

// Mostrar modal si no hay usuario
window.addEventListener("load", () => {
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  if (!usuarioActual) modal.classList.add("active");
  else mostrarPerfil();
});

function mostrarLogin() { loginForm.style.display = "block"; registroForm.style.display = "none"; }
function mostrarRegistro() { loginForm.style.display = "none"; registroForm.style.display = "block"; }

// Generar contraseña aleatoria
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
      alert(`Bienvenido de nuevo ${usuarioExistente.nick || emailInput} ✨`);
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioExistente));
      modal.classList.remove("active");
      mostrarPerfil();
    } else alert("Contraseña incorrecta.");
  } else alert("Usuario no registrado. Usa 'Registrarme'.");
}

// Registrarse
function registrarme() {
  const emailInput = document.getElementById("emailReg").value.trim();
  let passwordInput = document.getElementById("passwordReg").value.trim();
  const nickInput = document.getElementById("nickReg").value.trim();
  if (!emailInput || !nickInput) { alert("Completa todos los campos."); return; }
  if (!passwordInput) passwordInput = generarContrasena();

  let usuarios = JSON.parse(localStorage.getItem("usuariosApp") || "[]");
  if (usuarios.find(u => u.email === emailInput)) { alert("Usuario ya registrado."); return; }

  const nuevoUsuario = { email: emailInput, password: passwordInput, nick: nickInput };
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuariosApp", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));
  alert(`Cuenta creada. Tu contraseña es: ${passwordInput}`);
  modal.classList.remove("active");
  mostrarPerfil();
}

// Mostrar perfil
function mostrarPerfil() {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual"));
  const perfilInfo = document.getElementById("perfilInfo");
  perfilInfo.innerHTML = `<p>Nick: ${usuario.nick}</p><p>Email: ${usuario.email}</p>`;
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

// Subir archivo
function triggerUpload() { document.getElementById("uploadFile").click(); }
const uploadInput = document.getElementById("uploadFile");
uploadInput.addEventListener("change", () => {
  const archivo = uploadInput.files[0];
  if (!archivo) return;
  agregarPost(archivo);
  uploadInput.value = "";
});

// Agregar publicaciones
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
      media.muted = false;
    }
    media.classList.add("post-media");
    post.appendChild(media);

    const actions = document.createElement("div");
    actions.className = "post-actions";
    actions.innerHTML = `
      <button onclick="alert('Te gustó ❤️')">❤️</button>
      <button onclick="alert('Comentar 💬')">💬</button>
      <button onclick="alert('Compartir ↪️')">↪️</button>
    `;
    post.appendChild(actions);
    feed.prepend(post);
  });
}
