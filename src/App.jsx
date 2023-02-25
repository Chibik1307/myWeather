import { useEffect, useState } from "react";
import s from "./App.module.scss";
import Error from "@/components/Error/Error";
import CitiesList from "./components/CitiesList";
import { useSettings } from "./context/settingsContext";
import { getPositioning } from "./Helpers/geoposition";
import { getWeather } from "./Helpers/weather";
import Loader from "./components/Loader";
import SearchLocation from "./components/SearchLocation";

function App() {
  const { addCity, cities, isLoading, setIsLoading } = useSettings();
  const [weathers, setWeathers] = useState([]);
  const [error, setError] = useState(null);
  const [selectRegion, setSelectRegion] = useState(false);
  const [isWeathersLoaded, setIsWeathersLoaded] = useState(false);

  useEffect(() => {
    loadingWeathers().then(() => {
      if (cities.length) return;
      autoSearchPosition();
    });
  }, []);

  useEffect(() => {
    setWeathers(
      cities.map((city) => weathers.find((item) => item.id === city.id))
    );
  }, [cities]);

  const loadingWeathers = async () => {
    setIsWeathersLoaded(false);
    const foundedWeathers = await Promise.all(
      cities.map((item) => getWeather(item.name))
    );
    setWeathers(
      foundedWeathers.map((item, i) => ({ ...item, id: cities[i].id }))
    );
    setIsWeathersLoaded(true);
  };

  const autoSearchPosition = async () => {
    setIsLoading(true);
    const foundedCity = await getPositioning().finally(() => {
      setIsLoading(false);
    });
    if (!foundedCity) {
      setError(true);
      return;
    }
    addCity(foundedCity);
    addWeather(foundedCity);
  };

  const addWeather = async (city) => {
    const isWeatherExist = weathers.find((item) => item.id === city.id);
    if (isWeatherExist) return;
    const foundedWeather = await getWeather(city.name);
    setWeathers([...weathers, { ...foundedWeather, id: city.id }]);
  };

  const removeWeather = (city) => {
    const newWeatherList = weathers.filter((item) => item.id !== city.id);
    setWeathers(newWeatherList);
    setSelectRegion(true);
  };

  const handleLocationError = () => {
    setError(null);
    setSelectRegion(true);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={s.container}>
      {error ? (
        <Error
          error={{
            icon: "locaionError",
            title: "Не удалось определить местоположение",
            text: "Пожалуйста введите город вручную",
            btnText: "Ввести",
            btnAction: handleLocationError,
          }}
        />
      ) : null}
      {weathers.length && isWeathersLoaded ? (
        <CitiesList
          addWeather={addWeather}
          removeWeather={removeWeather}
          weathers={weathers}
          loadingWeathers={loadingWeathers}
          setWeathers={setWeathers}
        />
      ) : null}
      {selectRegion && !cities.length ? (
        <SearchLocation handle={setSelectRegion} addWeather={addWeather} />
      ) : null}
    </div>
  );
}

export default App;
