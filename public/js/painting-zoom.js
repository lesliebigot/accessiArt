// Zoom sur un tableau en plein écran avec accessibilité
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("fullscreen-modal");
  const fullscreenImage = document.getElementById("fullscreen-image");
  const paintingImage = document.getElementById("painting-image");
  const openFullscreenBtn = document.getElementById("fullscreen-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const paintingTitle = document.getElementById("fullscreen-title");
  const paintingPainter = document.getElementById("fullscreen-painter");

  // Fonction pour ouvrir le modal plein écran
  function openFullscreen() {
    modal.classList.add("modal-open");
    
    // Copier les informations du tableau
    fullscreenImage.src = paintingImage.src;
    fullscreenImage.alt = paintingImage.alt;
    paintingTitle.textContent = paintingImage.dataset.title;
    paintingPainter.textContent = paintingImage.dataset.painter;
    
    // Annoncer aux lecteurs d'écran
    announceToScreenReader("Image en plein écran. Appuyez sur Échap ou utilisez le bouton fermer pour revenir.");
    
    // Focus sur le bouton fermer
    closeModalBtn.focus();
  }

  // Fonction pour fermer le modal
  function closeFullscreen() {
    modal.classList.remove("modal-open");
    announceToScreenReader("Retour à la page du tableau");
    openFullscreenBtn.focus();
  }

  // Fonction pour annoncer aux lecteurs d'écran
  function announceToScreenReader(message) {
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.className = "sr-only";
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Event listeners
  openFullscreenBtn.addEventListener("click", openFullscreen);
  
  paintingImage.addEventListener("click", openFullscreen);
  
  paintingImage.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openFullscreen();
    }
  });

  closeModalBtn.addEventListener("click", closeFullscreen);

  // Fermer avec Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("modal-open")) {
      closeFullscreen();
    }
  });

  // Fermer en cliquant sur le fond
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeFullscreen();
    }
  });
});

