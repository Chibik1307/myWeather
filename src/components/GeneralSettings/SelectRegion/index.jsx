import s from "./style.module.scss";
import cn from "classnames";
import Icon from "@/components/Icon";
import SearchCity from "@/components/SearchCity/SearchCity";
import { useState } from "react";
import { useSettings } from "@/context/settingsContext";
import { getCityAdapter } from "@/Helpers/geoposition";
import { SortableItem, SortableList } from "@thaddeusjiang/react-sortable-list";

const SelectRegion = ({ className, addWeather, removeWeather }) => {
  const [isCitySearch, setIsCitySearch] = useState(false);
  const {
    cities,
    setCities,
    addCity,
    removeCity,
    setShowSettings,
    setIsLoading,
  } = useSettings();

  const handleSearchCity = async (city) => {
    setIsLoading(true);
    if (!city.length) {
      setIsCitySearch(false);
      return;
    }
    setIsCitySearch(false);
    const foundedCity = await getCityAdapter(city);
    addCity(foundedCity);
    addWeather(foundedCity);
    setIsLoading(false);
  };

  const handleDelete = (city) => {
    removeCity(city);
    removeWeather(city);
  };

  const handleCitySettings = (city) => {
    setShowSettings(city);
  };

  const DragHandler = (props) => (
    <div {...props} className={s.dragHandler} title="drag handler">
      <Icon className={s.menu} iconName={"menu"}></Icon>
    </div>
  );

  return (
    <div className={cn(className, s.selectRegion)}>
      <div className={s.labelGroup}>
        <Icon iconName={"geoIcon"} color={"#ffffff"} />
        <p>Округ</p>
      </div>

      <div className={s.addedCities}>
        <SortableList items={cities} setItems={setCities}>
          {({ items }) => (
            <>
              {items.map((city) => (
                <SortableItem
                  DragHandler={DragHandler}
                  key={city.id}
                  id={city.id}
                  className={s.item}
                >
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
                </SortableItem>
              ))}
            </>
          )}
        </SortableList>
      </div>

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
