import { dataMapper } from "../database/data-mapper.js";

export const mainController = {

  async renderPaintingsPage(req, res) {
    // Récupérer tous les tableaux de la BDD 
    const paintings = await dataMapper.getAllPaintings();
    // Récupérer tous les courants de la BDD 
    const movements = await dataMapper.getAllMovements();
    res.render("pages/paintings", { paintings, movements, subtitle : "Collection de tableaux" });
  },

  async renderOnePaintingPage(req, res, next) {
    // Récupérer l'ID du tableau
    const paintingId = parseInt(req.params.id,10);
    if (isNaN(paintingId)) { return next(); }
    // Récupérer les données depuis la BDD
    const painting = await dataMapper.getPaintingById(paintingId);
    // Si le tableau demandé n'existe, alors on renvoie une page 404
    if (! painting) {
      res.status(404).send("erreur HTTP 404, tableau non trouvé"); 
      // On arrête la fonction, pour éviter le second render() juste après
      return;
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
