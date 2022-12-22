import s from "./style.module.scss";
import cn from "classnames";
import Icon from "@/components/Icon";
import CurrentWeather from "./WeatherCurrent";
import Parameter from "./Parameter";
import Details from "./WeatherDetails";
import Forecast from "./WeatherForecast";
import { useSettings } from "@/context/settingsContext";
import ForecastByHour from "./WeatherForecast/ForecastByHour";

const Weather = ({ isFirstElem, cityWeather }) => {
  const {
    cities,
    setShowForecast,
    setMode,
    setIsShowGeneralSettings,
    isShowGeneralSettings,
  } = useSettings();

  const curCity = cities.find((item) => item.id === cityWeather.id);
  const curScale = curCity.isCelsius ? "temperatureC" : "temperatureF";

  return (
    <div
      className={cn(s.wrapper, {
        [s.fullMode]: curCity.isFullMode,
        [s.showForecast]: curCity.isShowForecast,
        [s.lightTheme]: curCity.isLightTheme,
      })}
    >
      <div className={s.controlsGroup}>
        <Icon
          onClick={() => setMode(curCity)}
          iconName={curCity.isFullMode ? "minimize" : "maximize"}
        />
        {isFirstElem && curCity.isFullMode && (
          <Icon
            onClick={() => setIsShowGeneralSettings(!isShowGeneralSettings)}
            iconName={"settings"}
          />
        )}
      </div>

      <CurrentWeather
        color={curCity.color}
        className={s.currentPlate}
        temperature={cityWeather[curScale]}
        iconName={cityWeather.iconName}
        region={cityWeather.region}
        phenomenon={cityWeather.phenomenon}
        isFullMode={curCity.isFullMode}
        lightTheme={curCity.isLightTheme}
      />

      {curCity.isFullMode && (
        <Details lightTheme={curCity.isLightTheme}>
          <Parameter iconName={"pressure"} color={curCity.color}>
            {cityWeather.pressure}мм
          </Parameter>
          <Parameter iconName={"wind"} color={curCity.color}>
            {cityWeather.wind}м/с
          </Parameter>
          <Parameter iconName={"humidity"} color={curCity.color}>
            {cityWeather.humidity}%
          </Parameter>
        </Details>
      )}

      <Forecast
        className={cn(s.forecast, {
          [s.showForecast]: curCity.isShowForecast,
          [s.lightTheme]: curCity.isLightTheme,
        })}
      >
        {cityWeather.forecast.map((el, idx) => {
          return (
            <ForecastByHour key={idx}>
              <ForecastByHour.Temp>{`${el[curScale].degrees}${el[curScale].scale}`}</ForecastByHour.Temp>
              <ForecastByHour.Icon>
                <Icon iconName={el.iconName} color={curCity.color}></Icon>
              </ForecastByHour.Icon>
              <ForecastByHour.Hour>{el.hour}</ForecastByHour.Hour>
            </ForecastByHour>
          );
        })}
      </Forecast>

      {curCity.isFullMode && (
        <button
          onClick={() => setShowForecast(curCity)}
          className={cn(s.forecastBtn, {
            [s.opened]: curCity.isShowForecast,
          })}
          title={"Show forecast"}
        >
          <Icon iconName={"showHide"} />
        </button>
      )}
    </div>
  );
};

export default Weather;
