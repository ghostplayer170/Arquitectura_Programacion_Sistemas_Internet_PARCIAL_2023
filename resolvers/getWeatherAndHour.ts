import { WeatherAndLocation } from "../types.ts";
import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts";
import { CondicionesMetereologicas } from "../types.ts"
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

  const infoCondicionesMetereologicas: CondicionesMetereologicas = {
        wind_mph: data.wind_mph,
        wind_kph: data.wind_kph,
        wind_degree: data.wind_degree,
        wind_dir: data.wind_dir,
        pressure_mb: data.pressure_mb,
        pressure_in: data.pressure_in,
        precip_mm: data.precip_mm,
        precip_in: data.precip_in,
        humidity: data.humidity,
        cloud: data.cloud,
        feelslike_c: data.feelslike_c,
        feelslike_f: data.feelslike_f,
        vis_km: data.vis_km,
        vis_miles: data.vis_miles,
        uv: data.uv,
        gust_mph: data.gust_mph,
        gust_kph: data.gust_kph
    }

  return {
    horaActual,
    condicionesMetereologicas: infoCondicionesMetereologicas
  };
};

export default getWeather;