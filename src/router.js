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

// Route de test pour erreur 500 (à supprimer en production)
router.get("/test-500", (req, res, next) => {
  next(new Error("Test erreur 500"));
});

// Export du router 
export default router;