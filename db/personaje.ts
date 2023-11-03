import mongoose from "npm:mongoose@7.6.3";
import { Personaje, RAZAS } from "../types.ts";

const Schema = mongoose.Schema; //Que campos tiene doc en la coleccion

const PersonajeSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    raza: { type: String, enum: RAZAS, required: true },
    descripcion: { type: String, required: true },
    habilidades: { type: [], required: true },
  },
  { timestamps: true } //Añade dos campos creado y modificado
);

export type PersonajeModelType = mongoose.Document & Omit<Personaje, "id">; //Modelo sirve para comunicar con la db

export default mongoose.model<PersonajeModelType>("Personaje", PersonajeSchema);