import { useEffect, useState } from "react";
import s from "./App.module.scss";
import GeneralSettings from "@/components/GeneralSettings";
import Error from "@/components/Error/Error";
import CitiesList from "./components/CitiesList";
import Icon from "@/components/Icon";
import { useSettings } from "./context/settingsContext";
import { getPositioning } from "./Helpers/geoposition";
import { getWeather } from "./Helpers/weather";
import Loader from "./components/Loader";

function App() {
  const { addCity, cities } = useSettings();
  const [weathers, setWeathers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    autoSearchPosition();
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

  // if (!cities.length) {
  //   return (
  //     <div className={s.container}>
  //       <SelectRegion addWeather={addWeather} removeWeather={removeWeather} />
  //     </div>
  //   );
  // }

  return (
    <div className={s.container}>
      {/* {error && <Error error={error} />} */}
      {isLoading ? <Loader /> : null}
      {/* {weathers.length ? (
        <CitiesList
          addWeather={addWeather}
          removeWeather={removeWeather}
          weathers={weathers}
        />
      ) : null} */}
    </div>
  );
}

export default App;

// return (
//   <Error
//     error={{
//       icon: "locationError",
//       title: "Не удалось определить местоположение",
//       text: "Пожалуйста введите город вручную",
//       btnText: "Ввести",
//     }}
//   />
// );
