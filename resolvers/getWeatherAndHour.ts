import { WeatherAndLocation } from "../types.ts";
import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";
const env = await load();

export const getWeather = async (ciudad: string): Promise<WeatherAndLocation> => {
  const BASE_URL = "http://api.weatherapi.com/v1";
  const WEATHERAPI_API_KEY = env["WEATHERAPI_API_KEY"] || Deno.env.get("WEATHERAPI_API_KEY");
  if (!WEATHERAPI_API_KEY) {
    throw new Error("WEATHERAPI_API_KEY is not defined");
  }

  const url = `${BASE_URL}/current.json?key=${WEATHERAPI_API_KEY}&q=${ciudad}`;
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("Cannot fetch weather");
  }
  const data = await response.json();

  const horaActual = data.location.localtime;

  const infoCondicionesMetereologicas = data.map(elem => {
    return {
        wind_mph: elem.wind_mph,
        wind_kph: elem.wind_kph,
        wind_degree: elem.wind_degree,
        wind_dir: elem.wind_dir,
        pressure_mb: elem.pressure_mb,
        pressure_in: elem.pressure_in,
        precip_mm: elem.precip_mm,
        precip_in: elem.precip_in,
        humidity: elem.humidity,
        cloud: elem.cloud,
        feelslike_c: elem.feelslike_c,
        feelslike_f: elem.feelslike_f,
        vis_km: elem.vis_km,
        vis_miles: elem.vis_miles,
        uv: elem.uv,
        gust_mph: elem.gust_mph,
        gust_kph: elem.gust_kph
    }
  })

  return {
    horaActual,
    condicionesMetereologicas: infoCondicionesMetereologicas
  };
};

export default getWeather;