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

// Login
function loginUser() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  if (!email || !password) { alert("Completa ambos campos."); return; }

  let usuarios = JSON.parse(localStorage.getItem("usuariosApp") || "[]");
  let user = usuarios.find(u => u.email === email);

  if (!user) {
    alert("Usuario no registrado. Usa Registrarse.");
    return;
  }
  if (user.password !== password) {
    alert("Contraseña incorrecta.");
    return;
  }

  // Guardamos sesión
  localStorage.setItem("usuarioActual", email);
  alert(`Bienvenido ${user.nick} ✨`);
  document.getElementById("loginBox").style.display = "none";
}

// Registro
function registerUser() {
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  if (!email || !password) { alert("Completa ambos campos."); return; }

  let usuarios = JSON.parse(localStorage.getItem("usuariosApp") || "[]");
  if (usuarios.find(u => u.email === email)) { alert("Usuario ya registrado."); return; }

  // Creamos usuario provisional sin nick
  usuarios.push({ email, password, nick: "" });
  localStorage.setItem("usuariosApp", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActual", email);

  // Pedimos el nick
  let nick = prompt("Cuenta creada ✅. Ingresa tu nick:");
  if (!nick) nick = "Usuario";

  // Guardamos nick
  usuarios = usuarios.map(u => u.email === email ? { ...u, nick } : u);
  localStorage.setItem("usuariosApp", JSON.stringify(usuarios));

  alert(`¡Bienvenido ${nick} ✨`);
  document.getElementById("loginBox").style.display = "none";
}
