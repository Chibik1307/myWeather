import { weatherTranscription } from "@/Helpers/weatherTranscription.js";

const APIKEY = "64150b20e9c7424794b90444212807";
const FORECAST = "https://api.weatherapi.com/v1/forecast.json";
const CITIES = "https://api.weatherapi.com/v1/search.json";

const adapterWeather = (weatherResult) => {
  const getDataByCode = (code) => {
    return weatherTranscription.find((item) => item.code == code);
  };

  const convertPressureMBToMMHG = (mb) => {
    return Math.round(mb / 1.333);
  };

  const convertWindKPHToMPS = (kph) => {
    return Math.round(kph / 3.6);
  };

  const getForecast = () => {
    const curTime = Math.floor(Date.now() / 1000);

    const allHours = weatherResult.forecast.forecastday[0].hour.concat(
      weatherResult.forecast.forecastday[1].hour
    );

    const hoursForForecast = allHours.filter((hour, idx) => {
      return hour.time_epoch >= curTime && idx % 3 === 0;
    });

    hoursForForecast.length = 5;

    return hoursForForecast.map((hour) => {
      const getHours = (unixTime) => {
        const hours = new Date(unixTime * 1000).getHours();
        if (hours.length < 2) {
          return `0${hours}`;
        }
        return hours;
      };
      const getMinutes = (unixTime) => {
        const minutes = new Date(unixTime * 1000).getMinutes();
        if (minutes.length !== 2) {
          return `${minutes}0`;
        }
        return minutes;
      };

      return {
        temperatureC: { degrees: Math.round(hour.temp_c), scale: "°С" },
        temperatureF: { degrees: Math.round(hour.temp_f), scale: "°F" },
        iconName: getDataByCode(hour.condition.code).iconName,
        hour: `${getHours(hour.time_epoch)}:${getMinutes(hour.time_epoch)}`,
      };
    });
  };

  const weatherData = {
    region: weatherResult.location.name,
    phenomenon: weatherResult.current.condition.text,
    temperatureC: {
      degrees: Math.round(weatherResult.current.temp_c),
      scale: "°С",
    },
    temperatureF: {
      degrees: Math.round(weatherResult.current.temp_f),
      scale: "°F",
    },
    iconName: getDataByCode(weatherResult.current.condition.code).iconName,
    pressure: convertPressureMBToMMHG(weatherResult.current.pressure_mb),
    wind: convertWindKPHToMPS(weatherResult.current.wind_kph),
    humidity: weatherResult.current.humidity,
    forecast: getForecast(),
  };

  return weatherData;
};

async function getWeather(city) {
  const url = `${FORECAST}?key=${APIKEY}&lang=ru&q=${city}&days=2&aqi=no&alerts=no&`;
  try {
    const resolve = await fetch(url);
    const resToJson = await resolve.json();
    return adapterWeather(resToJson);
  } catch (err) {
    return err;
  }
}

async function getCity(query) {
  const url = `${CITIES}?key=${APIKEY}&lang=ru&q=${query}`;
  try {
    const resolve = await fetch(url);
    const resToJson = await resolve.json();
    return resToJson;
  } catch (err) {
    return err;
  }
}

export { getCity, getWeather };
