const uploadFile = document.getElementById("uploadFile");
const feedInicio = document.getElementById("feedInicio");
const feedPerfil = document.getElementById("feedPerfil");

// Modal Reels
let reelModal = document.createElement("div");
reelModal.classList.add("reel-modal");
reelModal.innerHTML = `
  <button class="close-btn" onclick="closeReel()">✖</button>
  <div id="reelContent"></div>
`;
document.body.appendChild(reelModal);

// Selector oculto al dar click en "+"
function triggerUpload() {
  uploadFile.click();
}

// Subida de archivo
uploadFile.addEventListener("change", () => {
  const archivo = uploadFile.files[0];
  if (!archivo) return;

  const nuevoPost = crearPost(archivo);

  // Agregar a Inicio y Perfil
  feedInicio.prepend(nuevoPost.cloneNode(true));
  feedPerfil.prepend(nuevoPost);

  // Limpiar input
  uploadFile.value = "";

  alert("✅ Publicación agregada a Inicio y Perfil");
});

// Crear post
function crearPost(archivo) {
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
    contenido.loop = false; // No loop, control manual
    contenido.autoplay = true;

    // Contador de reproducciones
    let playCount = 0;
    contenido.addEventListener("ended", () => {
      playCount++;
      if (playCount < 2) contenido.play();
      else mostrarOverlay(nuevoPost, archivo, archivo.type);
    });

    // Pausar/reanudar al tocar
    contenido.style.cursor = "pointer";
    contenido.addEventListener("click", () => {
      if (contenido.paused) contenido.play();
      else contenido.pause();
    });
  }

  // Abrir modal al tocar imagen
  if (archivo.type.startsWith("image/")) {
    contenido.style.cursor = "pointer";
    contenido.addEventListener("click", () => openReel(archivo, archivo.type));
  }

  const info = document.createElement("div");
  info.classList.add("info");
  const usuario = localStorage.getItem("usuarioActual") || "Usuario";
  info.textContent = `@${usuario}`;

  nuevoPost.appendChild(contenido);
  nuevoPost.appendChild(info);
  return nuevoPost;
}

// Overlay "Ver de nuevo?"
function mostrarOverlay(post, archivo, tipo) {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.textContent = "Ver de nuevo?";
  overlay.addEventListener("click", () => openReel(archivo, tipo));
  post.appendChild(overlay);

  // Estilo del overlay
  overlay.style.position = "absolute";
  overlay.style.top = "50%";
  overlay.style.left = "50%";
  overlay.style.transform = "translate(-50%, -50%)";
  overlay.style.background = "rgba(0,0,0,0.7)";
  overlay.style.color = "#fff";
  overlay.style.padding = "15px 25px";
  overlay.style.borderRadius = "10px";
  overlay.style.fontSize = "18px";
  overlay.style.cursor = "pointer";
}

// Modal Reel
function openReel(archivo, tipo) {
  const reelContent = document.getElementById("reelContent");
  reelContent.innerHTML = "";

  if (tipo.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(archivo);
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    reelContent.appendChild(img);
  } else if (tipo.startsWith("video/")) {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(archivo);
    video.controls = true;
    video.autoplay = true;
    video.style.maxWidth = "90%";
    video.style.maxHeight = "90%";
    reelContent.appendChild(video);
  }

  reelModal.classList.add("active");
}

// Cerrar modal
function closeReel() {
  const video = reelModal.querySelector("video");
  if (video) video.pause();
  reelModal.classList.remove("active");
}

// Cambiar secciones
function mostrarSeccion(id, btn) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}
