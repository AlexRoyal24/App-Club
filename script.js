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

// Mostrar login/registro
function mostrarLogin() { loginForm.style.display="block"; registroForm.style.display="none"; }
function mostrarRegistro() { loginForm.style.display="none"; registroForm.style.display="block"; }

// Generar contraseña aleatoria
function generarContrasena() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let pass="";
  for(let i=0;i<8;i++) pass+=chars.charAt(Math.floor(Math.random()*chars.length));
  return pass;
}

// Iniciar sesión
function iniciarSesion(){
  const emailInput=document.getElementById("email").value.trim();
  const passwordInput=document.getElementById("password").value.trim();
  if(!emailInput||!passwordInput){ alert("Completa ambos campos."); return; }
  let usuarios=JSON.parse(localStorage.getItem("usuariosApp")||"[]");
  let usuarioExistente=usuarios.find(u=>u.email===emailInput);
  if(usuarioExistente){
    if(passwordInput===usuarioExistente.password){
      alert(`Bienvenido de nuevo ${usuarioExistente.nick} ✨`);
      localStorage.setItem("usuarioActual", emailInput);
      modal.classList.remove("active");
      document.getElementById("perfilInfo").innerHTML=`<p>Usuario: ${usuarioExistente.nick} <br>Correo: ${usuarioExistente.email}</p>`;
    }else alert("Contraseña incorrecta.");
  }else alert("Usuario no registrado. Usa 'Registrarme'.");
}

// Registrarse
function registrarme(){
  const emailInput=document.getElementById("emailReg").value.trim();
  let passwordInput=document.getElementById("passwordReg").value.trim();
  let nick=document.getElementById("nickReg").value.trim();
  if(!emailInput||!nick){ alert("Ingresa correo y nick."); return; }
  if(!passwordInput) passwordInput=generarContrasena();
  let usuarios=JSON.parse(localStorage.getItem("usuariosApp")||"[]");
  if(usuarios.find(u=>u.email===emailInput)){ alert("Usuario ya registrado. Usa 'Iniciar Sesión'."); return; }
  usuarios.push({email:emailInput,password:passwordInput,nick:nick});
  localStorage.setItem("usuariosApp",JSON.stringify(usuarios));
  localStorage.setItem("usuarioActual",emailInput);
  alert(`Cuenta creada. Tu contraseña es: ${passwordInput}`);
  modal.classList.remove("active");
  document.getElementById("perfilInfo").innerHTML=`<p>Usuario: ${nick} <br>Correo: ${emailInput}</p>`;
}

// Historias
function openStory(src){
  storyImg.src=src;
  storyModal.classList.add("active");
  setTimeout(closeStory,4000);
}
function closeStory(){ storyModal.classList.remove("active"); }

// Navbar inferior
function mostrarSeccion(id, btn){
  document.querySelectorAll(".section").forEach(sec=>sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}

// Activar subida de archivo desde "+"
function triggerUpload(){ document.getElementById("uploadFile").click(); }

// Subir publicación
const uploadInput=document.getElementById("uploadFile");
uploadInput.addEventListener("change",()=>{
  const archivo=uploadInput.files[0];
  if(!archivo) return;
  agregarPost(archivo);
  uploadInput.value="";
});

function agregarPost(archivo){
  const feeds=[document.getElementById("feedInicio"),document.getElementById("feedPerfil")];
  feeds.forEach(feed=>{
    const post=document.createElement("div");
    post.className="post";

    let media;
    if(archivo.type.startsWith("image/")){
      media=document.createElement("img");
      media.src=URL.createObjectURL(archivo);
    }else if(archivo.type.startsWith("video/")){
      media=document.createElement("video");
      media.src=URL.createObjectURL(archivo);
      media.controls=true;
      media.autoplay=false;
      media.muted=false;
      media.loop=false;
      media.classList.add("post-video");
    }
    media.classList.add("post-media");
    post.appendChild(media);

    // Botones tipo Instagram
    const actions=document.createElement("div");
    actions.className="post-actions";
    actions.innerHTML=`
      <button onclick="alert('Te gustó ❤️')">❤️</button>
      <button onclick="alert('Comentar 💬')">💬</button>
      <button onclick="alert('Compartir ↪️')">↪️</button>
    `;
    post.appendChild(actions);
    feed.prepend(post);

    // Clic sobre video para reproducir/pausar
    if(archivo.type.startsWith("video/")){
      media.addEventListener("click",()=>{ media.paused ? media.play() : media.pause(); });
    }
  });
}

// Mostrar sección y activar botón
function mostrarSeccion(id, btn) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

// Botón + para subir publicación
function triggerUpload() {
  document.getElementById("uploadFile").click();
}

// Subir publicación y mostrar en feed Inicio y Perfil
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
      media.autoplay = true;
      media.loop = true;
      media.muted = false; // Con sonido
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
    `;
    post.appendChild(actions);

    feed.prepend(post);
  });
}
