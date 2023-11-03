import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/monumento.ts";

// Esta función maneja una solicitud para eliminar un cliente.
const deleteMonumento = async (req: Request, res: Response) => {
  try {
    // Obtiene el cif del cliente de los parámetros de la solicitud.
    const { id } = req.params;

    // Busca y elimina el cliente con el CIF otorgado.
    const Monumento = await MonumentoModel.findOneAndDelete({ _id: id }).exec();

    // Si no encuentra cliente.
    if (!Monumento) {
      res.status(404).send("Monumento not found");
      return;
    }
    
    // Caso contrario, se elimina correctamente, envía un mensaje de cliente eliminado.
    res.status(200).send("Monumento deleted");

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteMonumento;