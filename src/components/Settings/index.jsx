import s from "./style.module.scss";
import cn from "classnames";
import Toggle from "@/components/Settings/Toggle";
import SelectColor from "@/components/Settings/SelectColor";
import { useSettings } from "../../context/settingsContext";
import useTruncate from "@/Hooks/useTruncate";
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
    <div className={cn(className, s.settings)}>
      <div className={s.title}>
        <p>Настройки для {`${useTruncate(city.name, 12)}`}</p>
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
      ></Toggle>

      <Toggle
        value={city.isLightTheme}
        change={changeTheme}
        className={s.selectTheme}
        title={"Тема"}
        toggleName={"theme"}
        leftIcon={"lightMode"}
        rightIcon={"darkMode"}
      ></Toggle>

      <SelectColor
        city={city}
        setColor={setColor}
        className={s.selectColor}
      ></SelectColor>
    </div>
  );
};

export default Settings;
