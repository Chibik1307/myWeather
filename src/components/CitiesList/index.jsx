import Weather from "@/components/Weather";
import s from "./style.module.scss";
import GeneralSettings from "@/components/GeneralSettings";
import { useSettings } from "../../context/settingsContext";

const CitiesList = ({
  weathers,
  setWeathers,
  addWeather,
  loadingWeathers,
  removeWeather,
}) => {
  const { isShowGeneralSettings } = useSettings();

  return (
    <div className={s.citiesList}>
      {isShowGeneralSettings ? (
        <GeneralSettings
          loadingWeathers={loadingWeathers}
          className={"settings"}
          weathers={weathers}
          setWeathers={setWeathers}
          addWeather={addWeather}
          removeWeather={removeWeather}
        />
      ) : (
        weathers.map((item, i) => (
          <Weather
            addWeather={addWeather}
            removeWeather={removeWeather}
            key={i}
            isFirstElem={i === 0}
            cityWeather={item}
          />
        ))
      )}
    </div>
  );
};

export default CitiesList;
