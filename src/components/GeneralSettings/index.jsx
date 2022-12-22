import s from "./style.module.scss";
import cn from "classnames";
import Toggle from "@/components/Settings/Toggle";
import SelectRegion from "@/components/GeneralSettings/SelectRegion";
import SelectColor from "@/components/Settings/SelectColor";
import { useSettings } from "../../context/settingsContext";
import Settings from "@/components/Settings";
import Icon from "@/components/Icon";

const GeneralSettings = ({ className, addWeather, removeWeather }) => {
  const {
    cities,
    setColor,
    isCelsiusGeneral,
    setIsCelsiusGeneral,
    isLightThemeGeneral,
    setIsLightThemeGeneral,
    isShowGeneralSettings,
    setIsShowGeneralSettings,
    generalColor,
    setGeneralColor,
  } = useSettings();

  const cityWithShowSettings = cities.find((item) => item.isShowSettings);

  if (cityWithShowSettings) {
    return <Settings className={"settings"} city={cityWithShowSettings} />;
  }

  return (
    <div className={cn(className, s.settings)}>
      <div className={s.title}>
        <p>Общие настройки</p>
        <Icon
          onClick={() => setIsShowGeneralSettings(!isShowGeneralSettings)}
          iconName={"exit"}
        />
      </div>

      <SelectRegion
        addWeather={addWeather}
        removeWeather={removeWeather}
        className={s.selectRegion}
      ></SelectRegion>

      <Toggle
        value={isCelsiusGeneral}
        change={setIsCelsiusGeneral}
        className={s.selectTemp}
        title={"Температура"}
        toggleName={"scale"}
        leftIcon={"celsius"}
        rightIcon={"fahrenheit"}
      ></Toggle>

      <Toggle
        value={isLightThemeGeneral}
        change={setIsLightThemeGeneral}
        className={s.selectTheme}
        title={"Тема"}
        toggleName={"theme"}
        leftIcon={"lightMode"}
        rightIcon={"darkMode"}
      ></Toggle>

      <SelectColor
        value={generalColor}
        change={setGeneralColor}
        setColor={setColor}
        className={s.selectColor}
      ></SelectColor>
    </div>
  );
};

export default GeneralSettings;
