import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/monumento.ts";
import getWeather from "./getWeatherAndHour.ts";
import WeatherAndLocation from "../types.ts";

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

    const infoWeatherAndLocation: WeatherAndLocation = getWeather(monumento.ciudad)

    // Caso contrario, envía una respuesta con la factura correspondiente.
    res.status(200).send({ 
        id: monumento._id.toString(),
        nombre: monumento.nombre,
        descripcion: monumento.descripcion,
        pais: monumento.pais,
        ciudad: monumento.ciudad,
        continente: monumento.continente,
        horaActual: infoWeatherAndLocation.horaActual,
        condicionesMetereologicas: infoWeatherAndLocation.condicionesMetereologicas
    });

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMonumento;