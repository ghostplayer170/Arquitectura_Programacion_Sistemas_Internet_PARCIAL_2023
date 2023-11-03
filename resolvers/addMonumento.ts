import { Request, Response } from "npm:express@4.18.2";
import MonumentoModel from "../db/monumento.ts";

// Esta función maneja una solicitud para agregar un nuevo monumento.
const addMonumento = async (req: Request, res: Response) => {
  try {
    // Obtiene el nombre, descripcion, codigo_postal, codigo_ISO del cuerpo de la solicitud.
    const { nombre, descripcion, codigo_postal, codigo_ISO } = req.body;
    
    // Verifica si el nombre, descripcion, codigo_postal, codigo_ISO están ausentes en la solicitud.
    if (!nombre || !descripcion || !codigo_ISO || !codigo_postal) {
      res.status(400).send("Nombre, descripcion, codigo ISO, codigo postal are required");
      return;
    }

    // Verifica si ya existe un monumento con el mismo nombre y codigo_postal en la base de datos.
    const alreadyExists = await MonumentoModel.findOne({ nombre, codigo_postal }).exec();

    if (alreadyExists) {
      res.status(400).send("Monumento already exists");
      return;
    }

    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${codigo_ISO}`
    );

    if (response.status !== 200) {
      res.status(response.status).send(response.statusText);
      return;
    }
    
    const infoPais = await response.json();

    console.log(infoPais);

    const continente = infoPais.region;
    const pais = infoPais.name.common;
    const ciudad = "Paris";

    // Caso contrario, crea un nuevo monumento y lo guarda en la base de datos.
    const newMonumento = new MonumentoModel({ nombre, descripcion, codigo_postal, codigo_ISO, continente, ciudad, pais });
    await newMonumento.save();

    // Responde con los datos del nuevo monumento.
    res.status(200).send({
      name: newMonumento.nombre,
      descripcion: newMonumento.descripcion,
      codigo_postal: newMonumento.codigo_postal,
      codigo_ISO: newMonumento.codigo_ISO,
      continente: newMonumento.continente,
      ciudad: newMonumento.ciudad,
      pais: newMonumento.pais,
    });
    
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addMonumento;