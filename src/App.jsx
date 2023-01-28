import { useEffect, useState } from "react";
import s from "./App.module.scss";
import Error from "@/components/Error/Error";
import CitiesList from "./components/CitiesList";
import { useSettings } from "./context/settingsContext";
import { getPositioning } from "./Helpers/geoposition";
import { getWeather } from "./Helpers/weather";
import Loader from "./components/Loader";
import SearchLocation from "./components/SearchLocation";
import { getLocalStorage } from "./Hooks/useLocalStorage";

function App() {
  const { addCity, cities, setCities, isLoading, setIsLoading } = useSettings();
  const [weathers, setWeathers] = useState([]);
  const [error, setError] = useState(null);
  const [selectRegion, setSelectRegion] = useState(false);

  useEffect(() => {
    autoSearchPosition();
  }, []);

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
    const foundedWeather = await getWeather(city.name);
    setWeathers([...weathers, { ...foundedWeather, ...city }]);
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
      {weathers.length ? (
        <CitiesList
          addWeather={addWeather}
          removeWeather={removeWeather}
          weathers={weathers}
        />
      ) : null}
      {selectRegion && !cities.length ? (
        <SearchLocation handle={setSelectRegion} addWeather={addWeather} />
      ) : null}
    </div>
  );
}

export default App;
