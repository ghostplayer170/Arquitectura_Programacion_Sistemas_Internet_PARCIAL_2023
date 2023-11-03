import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/monumento.ts";

// Esta función maneja una solicitud para obtener una factura.
const getMonumento = async (req: Request, res: Response) => {
  try {
    // Recoge el id de los parámetros de la solicitud.
    const { id } = req.params;

    // Busca la factura correspondiente al id proporcionado.
    const monumento = await MonumentoModel.findOne({ _id: id }).exec();

    // Si no encuentra la factura.
    if (!monumento) {
      res.status(404).send("Monumento not found");
      return;
    }
    // Caso contrario, envía una respuesta con la factura correspondiente.
    res.status(200).send({ monumento });

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMonumento;