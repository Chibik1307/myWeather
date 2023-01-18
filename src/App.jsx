import { useEffect, useState } from "react";
import s from "./App.module.scss";
import cn from "classnames";
import GeneralSettings from "@/components/GeneralSettings";
import Error from "@/components/Error/Error";
import CitiesList from "./components/CitiesList";
import Icon from "@/components/Icon";
import { useSettings } from "./context/settingsContext";
import { getPositioning } from "./Helpers/geoposition";
import { getWeather } from "./Helpers/weather";
import Loader from "./components/Loader";
import SearchLocation from "./components/SearchLocation";

function App() {
  const { addCity, cities } = useSettings();
  const [weathers, setWeathers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectRegion, setSelectRegion] = useState(false);

  useEffect(() => {
    autoSearchPosition();
    if (!cities.length) {
      setError("error");
    }
  }, []);

  const autoSearchPosition = async () => {
    const foundedCity = await getPositioning();
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
  };

  const handleLocationError = () => {
    setError(null);
    setSelectRegion(true);
  };

  return (
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
      {/* {isLoading ? <Loader /> : null} */}
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
