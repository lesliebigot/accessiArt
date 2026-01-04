import { Router } from "express";
import { mainController } from "./controllers/main.controller.js";

// Création d'un router
export const router = Router();

// Home page
router.get("/", (req, res) => {
  res.render("pages/home", {subtitle : "Accueil"});
});

// Paintings page
router.get("/paintings", mainController.renderPaintingsPage);

// One painting page
router.get("/painting/:id", mainController.renderOnePaintingPage);

// Movements page
router.get("/movements", mainController.renderMovementsPage);

// Legal notice page
router.get("/legal-notice", mainController.renderLegalNoticePage);

// Export du router 
export default router;