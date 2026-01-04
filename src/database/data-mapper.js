import client from "./database-client.js";

export const dataMapper = {
  async getAllPaintings() {
    const result = await client.query(`
      SELECT
      "painting".*, 
        "movement"."name" AS movement_name 
      FROM 
        "painting" JOIN "movement" 
      ON 
        "painting"."movement_id" = "movement"."id" `);
    const allPaintings = result.rows;
    return allPaintings;
  },

  async getPaintingById(paintingId) {
    const result = await client.query(`
      SELECT 
      "painting".*, 
        "movement"."name" AS movement_name 
      FROM 
        "painting" JOIN "movement" 
      ON 
        "painting"."movement_id" = "movement"."id" 
      WHERE 
        "painting"."id" = $1`
    , [paintingId]); 
    const painting = result.rows[0]; // { id, name, ... }
    return painting; 
  },

  async getAllMovements() {
    // eslint-disable-next-line quotes
    const result = await client.query('SELECT * FROM "movement"');
    const allMovements = result.rows;
    return allMovements;
  },
};