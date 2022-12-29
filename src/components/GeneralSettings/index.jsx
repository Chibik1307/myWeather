import s from "./style.module.scss";
import cn from "classnames";
import SelectRegion from "@/components/GeneralSettings/SelectRegion";
import { useSettings } from "../../context/settingsContext";
import Settings from "@/components/Settings";
import Icon from "@/components/Icon";

const GeneralSettings = ({ className, addWeather, removeWeather }) => {
  const { cities, isShowGeneralSettings, setIsShowGeneralSettings } =
    useSettings();

  const cityWithShowSettings = cities.find((item) => item.isShowSettings);

  if (cityWithShowSettings) {
    return <Settings className={"settings"} city={cityWithShowSettings} />;
  }

  return (
    <div className={cn(className, s.settings)}>
      <div className={s.title}>
        <p>Настройки</p>
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
    </div>
  );
};

export default GeneralSettings;
