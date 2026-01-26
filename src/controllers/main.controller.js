import { dataMapper } from "../database/data-mapper.js";

export const mainController = {

  async renderPaintingsPage(req, res) {
    // Récupérer tous les tableaux de la BDD 
    const paintings = await dataMapper.getAllPaintings();
    // Récupérer tous les courants de la BDD 
    const movements = await dataMapper.getAllMovements();
    res.render("pages/paintings", { paintings, movements, subtitle : "Collection de tableaux" });
  },

  // eslint-disable-next-line no-unused-vars
  async renderOnePaintingPage(req, res, next) {
    // Récupérer l'ID du tableau
    const paintingId = parseInt(req.params.id,10);
    if (isNaN(paintingId)) { 
      return res.status(404).render("pages/error", {
        subtitle: "Tableau non trouvé",
        error: {
          code: 404,
          title: "Tableau non trouvé",
          message: "Le tableau demandé n'existe pas ou l'identifiant est invalide." 
        }
      });
    }
    // Récupérer les données depuis la BDD
    const painting = await dataMapper.getPaintingById(paintingId);
    // Si le tableau demandé n'existe, alors on renvoie une page 404
    if (! painting) {
      return res.status(404).render("pages/error", {
        subtitle: "Tableau non trouvé",
        error: {
          code: 404,
          title: "Tableau non trouvé",
          message: "Le tableau demandé n'existe pas dans notre collection."
        }
      });
    }
    res.render("pages/painting", { painting , subtitle : `Détails du tableau ${painting.title}`  });
  },

  async renderMovementsPage(req, res) {
    // Récupérer tous les courants de la BDD 
    const movements = await dataMapper.getAllMovements();
    res.render("pages/movements", { movements , subtitle : "Les courants picturaux" });
  },

  renderLegalNoticePage(req, res) {
    res.render("pages/legal-notice", { subtitle : "Mentions légales" });
  }

};
