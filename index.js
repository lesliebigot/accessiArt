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

// TODO refacto error middlewares
// Middleware : not found
app.use((error, req, res, next) => {
  console.error(error);
  res.status(404).send("erreur HTTP 404, page non trouvée");
  next();
});

// Middleware : global error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send("erreur HTTP 500, problème serveur");
  next();
});

// Lancer un serveur HTTP
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`🌻 Server started at http://localhost:${port}`);
});