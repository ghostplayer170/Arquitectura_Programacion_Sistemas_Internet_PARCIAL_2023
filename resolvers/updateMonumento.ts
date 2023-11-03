import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/monumento.ts";

const updateMonumento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, codigo_postal, codigo_ISO } = req.body;
    if (!name) {
      res.status(400).send("Name and age are required");
      return;
    }

    const updatedMonumento = await MonumentoModel.findOneAndUpdate(
    // Buscamos un registro con `_id` igual a `id`
    { _id: id },
    // Actualizamos campos
    { nombre, descripcion, codigo_postal, codigo_ISO },
    // Opciones adicionales, en este caso `new: true` indica que queremos obtener el documento actualizado
    { new: true }
    ).exec();

    if (!updatedMonumento) {
      res.status(404).send("Monumento not found");
      return;
    }

    res.status(200).send({
        updatedMonumento
    });
    
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateMonumento;
