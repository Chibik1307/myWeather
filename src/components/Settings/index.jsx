import s from "./style.module.scss";
import cn from "classnames";
import Toggle from "@/components/Settings/Toggle";
import SelectColor from "@/components/Settings/SelectColor";
import { useSettings } from "../../context/settingsContext";
import Icon from "@/components/Icon";

const Settings = ({ className, city }) => {
  const { setScale, setTheme, setColor, setShowSettings } = useSettings();
  const changeScale = () => {
    setScale(city);
  };

  const changeTheme = () => {
    setTheme(city);
  };

  return (
    <div
      className={cn(className, s.settings, {
        [s.lightTheme]: city.isLightTheme,
      })}
    >
      <div className={s.title}>
        <p>Настройки для {`${city.name}`}</p>
        <Icon onClick={() => setShowSettings(city)} iconName={"exit"} />
      </div>

      <Toggle
        value={city.isCelsius}
        change={changeScale}
        className={s.selectTemp}
        title={"Температура"}
        toggleName={"scale"}
        leftIcon={"celsius"}
        rightIcon={"fahrenheit"}
        lightTheme={city.isLightTheme}
      ></Toggle>

      <Toggle
        value={city.isLightTheme}
        change={changeTheme}
        className={s.selectTheme}
        title={"Тема"}
        toggleName={"theme"}
        leftIcon={"lightMode"}
        rightIcon={"darkMode"}
        lightTheme={city.isLightTheme}
      ></Toggle>

      <SelectColor
        city={city}
        setColor={setColor}
        lightTheme={city.isLightTheme}
        className={s.selectColor}
      ></SelectColor>
    </div>
  );
};

export default Settings;
