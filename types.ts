export type Monumento = {
    nombre: string;
    descripcion: string;
    codigo_postal: number;
    codigo_ISO: string;
    ciudad: string;
    pais: string;
    continente: string,
};

export type WeatherAndLocation = {
    horaActual: string;
    condicionesMetereologicas: string,
}