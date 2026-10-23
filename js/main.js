// Helpers compartilhados (player / lightbox também estão inline nas páginas)

function openPlayer(el) {
  const videoSrc = el.getAttribute("data-video");
  const modal = document.getElementById("playerModal");
  const video = document.getElementById("videoPlayer");
  if (!videoSrc || !videoSrc.trim()) {
    alert("URL do vídeo ainda não cadastrada.");
    return;
  }
  video.src = videoSrc;
  modal.classList.add("active");
  video.play().catch(() => {});
}

function closePlayer() {
  const modal = document.getElementById("playerModal");
  const video = document.getElementById("videoPlayer");
  if (video) {
    video.pause();
    video.src = "";
  }
  modal?.classList.remove("active");
}

document.getElementById("playerModal")?.addEventListener("click", e => {
  if (e.target.id === "playerModal") closePlayer();
});

function openLightbox(el) {
  const img = el.querySelector("img");
  const modal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  if (img?.src) lightboxImg.src = img.src;
  modal?.classList.add("active");
}

function closeLightbox() {
  document.getElementById("lightboxModal")?.classList.remove("active");
}

document.getElementById("lightboxModal")?.addEventListener("click", e => {
  if (e.target.id === "lightboxModal") closeLightbox();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closePlayer();
    closeLightbox();
  }
});
