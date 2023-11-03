import { Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/monumento.ts";

// Esta función maneja una solicitud para obtener todos los monumentos.
const getMonumento = async (req: Request, res: Response) => {
  try {
    
    // Busca todos los monumentos en la base de datos
    const monumentos = await MonumentoModel.find({}).exec();

    // Si no se encuentran monumentos.
    if (!monumentos) {
      res.status(404).send("Monumentos not found");
      return;
    }

    const todosMonumentos = monumentos.map((elem) => {
        return{ 
                id: elem._id.toString(),
                nombre: elem.nombre,
                pais: elem.pais
            }
    })
    
    // Caso contrario, envía una respuesta con la lista de monumentos.
    res.status(200).send({
        todosMonumentos
    });

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMonumento;
