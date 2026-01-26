import "dotenv/config";
import express from "express";
import { router } from "./src/router.js";

// Créer une app Express
const app = express();

// Configuration du view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Middleware pour les assets static
app.use(express.static("./public"));

// Brancher le routeur
app.use(router);

// Middleware : not found (404)
app.use((req, res) => {
  res.status(404).render("pages/error", {
    subtitle: "Page non trouvée",
    error: {
      code: 404,
      title: "Page non trouvée",
      message: "Désolé, la page que vous recherchez n'existe pas ou a été déplacée."
    }
  });
});

// Middleware : global error handler (500)
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  console.error("Erreur serveur:", error);
  
  res.status(500).render("pages/error", {
    subtitle: "Erreur du serveur",
    error: {
      code: 500,
      title: "Erreur du serveur",
      message: "Une erreur inattendue s'est produite. Nos équipes ont été informées et travaillent à résoudre le problème."
    }
  });
});

// Lancer un serveur HTTP
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`🌻 Server started at http://localhost:${port}`);
});