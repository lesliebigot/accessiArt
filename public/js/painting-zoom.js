// Zoom sur un tableau

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("zoom-modal");
  const zoomedImage = document.getElementById("zoomed-image");
  const paintingImage = document.getElementById("painting-image");
  //const imageContainer = document.getElementById("image-container");
  const zoomBtn = document.getElementById("zoom-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const zoomInBtn = document.getElementById("zoom-in-btn");
  const zoomOutBtn = document.getElementById("zoom-out-btn");
  const resetZoomBtn = document.getElementById("reset-zoom-btn");

  let currentScale = 1;
  let isDragging = false;
  let startX, startY; //scrollLeft, scrollTop;

  // Fonction pour ouvrir le modal
  function openModal() {
    modal.classList.add("modal-open");
    currentScale = 1;
    zoomedImage.style.transform = `scale(${currentScale})`;
    
    // Annoncer aux lecteurs d'écran
    announceToScreenReader("Image agrandie en plein écran. Utilisez les boutons de zoom ou Échap pour fermer.");
    
    // Focus sur le bouton fermer
    closeModalBtn.focus();
  }

  // Fonction pour fermer le modal
  function closeModal() {
    modal.classList.remove("modal-open");
    announceToScreenReader("Retour à la page du tableau");
    zoomBtn.focus();
  }

  // Fonction de zoom
  function zoom(direction) {
    if (direction === "in") {
      currentScale = Math.min(currentScale + 0.5, 5); // Max 5x
    } else if (direction === "out") {
      currentScale = Math.max(currentScale - 0.5, 0.5); // Min 0.5x
    } else {
      currentScale = 1;
    }
    
    zoomedImage.style.transform = `scale(${currentScale})`;
    announceToScreenReader(`Zoom à ${Math.round(currentScale * 100)}%`);
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

  // Drag to pan
  zoomedImage.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - zoomedImage.offsetLeft;
    startY = e.pageY - zoomedImage.offsetTop;
    zoomedImage.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - startX;
    const y = e.pageY - startY;
    zoomedImage.style.left = `${x}px`;
    zoomedImage.style.top = `${y}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    zoomedImage.style.cursor = "move";
  });

  // Event listeners
  zoomBtn.addEventListener("click", openModal);
  paintingImage.addEventListener("click", openModal);
  paintingImage.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal();
    }
  });
  
  closeModalBtn.addEventListener("click", closeModal);
  zoomInBtn.addEventListener("click", () => zoom("in"));
  zoomOutBtn.addEventListener("click", () => zoom("out"));
  resetZoomBtn.addEventListener("click", () => zoom("reset"));

  // Fermer avec Échap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("modal-open")) {
      closeModal();
    }
  });

  // Zoom avec la molette
  zoomedImage.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoom("in");
    } else {
      zoom("out");
    }
  });

  // Fermer en cliquant sur le fond
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});

