// filtre tableaux par courant

document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("movement-dropdown");
  const paintingsList = document.querySelectorAll("[data-movement-id]");
  //eslint-disable-next-line quotes
  const statusText = document.querySelector('[role="status"][aria-live="polite"]');
  const noResultsMessage = document.getElementById("no-results-message");

  // Récupérer le paramètre 'movement' de l'URL sur la page movement.ejs
  function getMovementFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("movement");
  }
  // Mettre à jour l'URL sans recharger la page
  function updateURL(movementId) {
    const url = new URL(window.location);
    if (movementId === "*") {
      url.searchParams.delete("movement");
    } else {
      url.searchParams.set("movement", movementId);
    }
    window.history.pushState({}, "", url);
  }

  // Fonction pour filtrer les tableaux
  function filterPaintings(movementId) {
    let visibleCount = 0;
    paintingsList.forEach((painting) => {
      const paintingMovementId = painting.getAttribute("data-movement-id");

      // Afficher tous les tableaux si "Tous les tableaux" est sélectionné
      if (movementId === "*"|| movementId === null) {
        painting.style.display = "";
        visibleCount++;
      } 
      // Afficher uniquement les tableaux du courant sélectionné
      else if (paintingMovementId === movementId) {
        painting.style.display = "";
        visibleCount++;
      } 
      // Cacher les autres tableaux
      else {
        painting.style.display = "none";
      }
    });

    // Mettre à jour le compteur
    updateCounter(visibleCount);

    // Afficher/cacher le message "aucun résultat"
    toggleNoResultsMessage(visibleCount);

    // Annoncer le changement aux lecteurs d'écran
    announceFilterChange(movementId, visibleCount);

    // Mettre à jour l'URL
    updateURL(movementId || "*");
  }

  // Mettre à jour le texte du compteur
  function updateCounter(count) {
    const word = count > 1 ? "tableaux" : "tableau";
    statusText.textContent = `${count} ${word} dans la collection`;
  }

  // Afficher ou cacher le message "aucun résultat"
  function toggleNoResultsMessage(count) {
    if (noResultsMessage) {
      noResultsMessage.style.display = count === 0 ? "block" : "none";
    }
  }

  // Annoncer le filtrage aux lecteurs décran
  function announceFilterChange(movementId, count) {
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const movementName = selectedOption.text;
    
    // Créer une zone pour annoncer le changement
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.className = "sr-only";
    
    if (movementId === "*") {
      announcement.textContent = `Affichage de tous les tableaux. ${count} tableaux trouvés.`;
    } else {
      announcement.textContent = `Filtrage par ${movementName}. ${count} tableaux trouvés.`;
    }
    
    document.body.appendChild(announcement);
    
    // Supprimer l'annonce après qu'elle ait été lue
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // Écouteur d'événement sur le dropdown
  dropdown.addEventListener("change", (event) => {
    event.preventDefault();
    const selectedMovement = event.target.value;
    filterPaintings(selectedMovement);
  });

  // Au chargement de la page, vérifier s'il y a un filtre dans l'URL
  const movementFromURL = getMovementFromURL();  
  if (movementFromURL) {
    // Mettre à jour le dropdown pour refléter le filtre
    dropdown.value = movementFromURL;
    // Appliquer le filtre
    filterPaintings(movementFromURL);
  }

  // Restaurer le filtre précédent si l'utilisateur revient sur la page 
  /*const savedMovement = sessionStorage.getItem("selectedMovement");
  if (savedMovement) {
    dropdown.value = savedMovement;
    filterPaintings(savedMovement);
  }*/
});