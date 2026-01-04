// Chargement les variables d'environnement
import "dotenv/config";

// Récupération du module pg
import { Client } from 'pg';

// Récupération de l'adresse de la BDD (dans le .env)
const url = process.env.PG_URL;

// Création d'un tunnel de connexion vers la BDD
const client = new Client(url);

// Ouverture du tunnel
await client.connect();

// Export du client
export default client;