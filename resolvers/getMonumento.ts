import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/monumento.ts";
import getWeather from "./getWeatherAndHour.ts";
import WeatherAndLocation from "../types.ts";

const getMonumento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const monumento = await MonumentoModel.findOne({ _id: id }).exec();

    if (!monumento) {
      res.status(404).send("Monumento not found");
      return;
    }

    const infoWeatherAndLocation: WeatherAndLocation = await getWeather(monumento.ciudad);

    console.log(infoWeatherAndLocation)

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