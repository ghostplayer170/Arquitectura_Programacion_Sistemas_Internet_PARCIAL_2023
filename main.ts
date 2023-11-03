import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";
/*
import getPersonajes from "./resolvers/getPersonajes.ts";
import getOnePersonaje from "./resolvers/getOnePersonaje.ts";
import addPersonaje from "./resolvers/addPersonaje.ts";
import deletePersonaje from "./resolvers/deletePersonaje.ts";
import modifyPersonaje from "./resolvers/modifyPersonaje.ts";
*/
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts"; //Leer variables de entorno
const env = await load(); //Carga Variables de entorno

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL"); //Variable del sistema operativo
const PORT = env.PORT || Deno.env.get("PORT");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

try{
  await mongoose.connect(MONGO_URL);
  console.info("Mongo Connected");
}catch(e){
  console.error(e);
}


const app = express();
app.use(express.json());

app.get("/",(req: Request, res: Response) => { res.status(200).send("PARCIAL ARQ PROGRAM SISTEMAS INTERNET"); })
/*
app
  .get("/api/tierramedia/personajes", getPersonajes)
  .get("/api/tierramedia/personajes/:id", getOnePersonaje)
  .post("/api/tierramedia/personajes", addPersonaje)
  .delete("/api/tierramedia/personajes/:id", deletePersonaje)
  .put("/api/tierramedia/personajes/:id", modifyPersonaje);
*/
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});