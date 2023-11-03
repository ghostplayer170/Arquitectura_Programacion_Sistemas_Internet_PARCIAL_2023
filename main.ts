import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getMonumentos from "./resolvers/getMonumentos.ts";
import getMonumento from "./resolvers/getMonumento.ts";
import addMonumento from "./resolvers/addMonumento.ts";
import deleteMonumento from "./resolvers/deleteMonumento.ts";
import updateMonumento from "./resolvers/updateMonumento.ts";

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

//app.get("/",(req: Request, res: Response) => { res.status(200).send("PARCIAL ARQ PROGRAM SISTEMAS INTERNET"); })

app
  .get("/api/monumentos", getMonumentos)
  .get("/api/monumentos/:id", getMonumento)
  .post("/api/monumentos", addMonumento)
  .delete("/api/monumentos/:id", deleteMonumento)
  .put("/api/monumentos/:id", updateMonumento);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});