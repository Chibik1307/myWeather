import SearchCity from "@/components/SearchCity/SearchCity";
import Icon from "@/components/Icon";
import s from "./style.module.scss";
import { useSettings } from "@/context/settingsContext";
import { getCityAdapter } from "@/Helpers/geoposition";

const SearchLocation = ({ setSelectRegion, addWeather }) => {
  const { addCity } = useSettings();
  const handleSearchCity = async (city) => {
    const foundedCity = await getCityAdapter(city);
    addCity(foundedCity);
    addWeather(foundedCity);
    () => setSelectRegion(false);
  };
  return (
    <div className={s.container}>
      <div className={s.labelGroup}>
        <Icon iconName={"geoIcon"} color={"#ffffff"} />
        <p>Округ</p>
      </div>
      <SearchCity
        getCityWeather={handleSearchCity}
        className={s.separateInput}
      />
    </div>
  );
};

export default SearchLocation;
