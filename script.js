// Alternar pestañas
const tabLoginBtn = document.getElementById("tabLoginBtn");
const tabRegBtn = document.getElementById("tabRegBtn");
const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");

tabLoginBtn.addEventListener("click", () => {
  tabLogin.classList.add("active");
  tabRegister.classList.remove("active");
  tabLoginBtn.classList.add("active");
  tabRegBtn.classList.remove("active");
});
tabRegBtn.addEventListener("click", () => {
  tabLogin.classList.remove("active");
  tabRegister.classList.add("active");
  tabLoginBtn.classList.remove("active");
  tabRegBtn.classList.add("active");
});

// Funciones login/registro
function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  let usuarios = JSON.parse(localStorage.getItem("usuariosApp") || "[]");
  let user = usuarios.find(u => u.email === email && u.password === password);

  if (user) {
    alert(`Bienvenido ${user.nick} ✨`);
    localStorage.setItem("usuarioActual", email);
    document.getElementById("loginBox").style.display = "none";
  } else {
    alert("Correo o contraseña incorrectos.");
  }
}

function registerUser() {
  const nick = document.getElementById("regNick").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!nick || !email || !password) { alert("Completa todos los campos."); return; }

  let usuarios = JSON.parse(localStorage.getItem("usuariosApp") || "[]");
  if (usuarios.find(u => u.email === email)) { alert("Usuario ya registrado."); return; }

  usuarios.push({ nick, email, password });
  localStorage.setItem("usuariosApp", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActual", email);

  alert(`Cuenta creada. Bienvenido ${nick} ✨`);
  document.getElementById("loginBox").style.display = "none";
}

// Secciones
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
  uploadInput.value = "";
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
      media.muted = false;
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
    `;
    post.appendChild(actions);
    feed.prepend(post);
  });
}

// Historias
const storyModal = document.getElementById("storyModal");
const storyImg = document.getElementById("storyImg");
function openStory(src) {
  storyImg.src = src;
  storyModal.classList.add("active");
  setTimeout(() => storyModal.classList.remove("active"), 4000);
}
