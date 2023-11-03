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
    condicionesMetereologicas: CondicionesMetereologicas,
}

export type CondicionesMetereologicas = {
    wind_mph: number,
    wind_kph: number,
    wind_degree: number,
    wind_dir: string,
    pressure_mb: number,
    pressure_in: number,
    precip_mm: number,
    precip_in: number,
    humidity: number,
    cloud: number,
    feelslike_c: number,
    feelslike_f: number,
    vis_km: number,
    vis_miles: number,
    uv: number,
    gust_mph: number,
    gust_kph: number
}