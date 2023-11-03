import mongoose from "npm:mongoose@7.6.3";
import { Monumento } from "../types.ts";

const Schema = mongoose.Schema; //Que campos tiene doc en la coleccion

const MonumentoSchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: true },
    codigo_postal: { type: Number, required: true },
    codigo_ISO: { type: Number, required: true } 
  },
// { timestamps: true } //Añade dos campos creado y modificado
);

export type MonumentoModelType = mongoose.Document & Omit<Monumento, "id">; //Modelo sirve para comunicar con la db

export default mongoose.model<MonumentoModelType>("Monumento", MonumentoSchema);