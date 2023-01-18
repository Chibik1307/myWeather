import s from "./style.module.scss";
import cn from "classnames";
import Icon from "@/components/Icon";
import SearchCity from "@/components/SearchCity/SearchCity";
import { useState } from "react";
import { useSettings } from "@/context/settingsContext";
import { getCityAdapter } from "@/Helpers/geoposition";

const SelectRegion = ({ className, addWeather, removeWeather }) => {
  const [isCitySearch, setIsCitySearch] = useState(false);
  const { cities, addCity, removeCity, setShowSettings } = useSettings();

  const handleSearchCity = async (city) => {
    if (!city.length) {
      setIsCitySearch(false);
      return;
    }
    setIsCitySearch(false);
    const foundedCity = await getCityAdapter(city);
    addCity(foundedCity);
    addWeather(foundedCity);
  };

  const handleDelete = (city) => {
    removeCity(city);
    removeWeather(city);
  };

  const handleCitySettings = (city) => {
    setShowSettings(city);
  };

  return (
    <div className={cn(className, s.selectRegion)}>
      <div className={s.labelGroup}>
        <Icon iconName={"geoIcon"} color={"#ffffff"} />
        <p>Округ</p>
      </div>
      <ul className={s.addedCities}>
        {cities.map((city, idx) => {
          return (
            <li key={idx}>
              <Icon className={s.menu} iconName={"menu"}></Icon>
              <p>{city.name}</p>
              <Icon
                onClick={() => handleCitySettings(city)}
                className={s.citySettings}
                iconName={"citySettings"}
              ></Icon>
              <Icon
                onClick={() => handleDelete(city)}
                className={s.trash}
                iconName={"trash"}
              ></Icon>
            </li>
          );
        })}
      </ul>
      <div className={s.addGroup}>
        <button
          onClick={() => setIsCitySearch(true)}
          className={cn({ [s.hidden]: isCitySearch })}
          style={{ color: "#ffffff" }}
        >
          <Icon iconName={"addCity"} color={"#ffffff"}></Icon>
          Добавить
        </button>
        <SearchCity
          getCityWeather={handleSearchCity}
          className={cn(s.searchCity, { [s.active]: isCitySearch })}
        />
      </div>
    </div>
  );
};

export default SelectRegion;
