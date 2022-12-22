import s from "./style.module.scss";
import cn from "classnames";
import Icon from "@/components/Icon";
import Temperature from "@/components/Weather/Temperature";
import useTruncate from "@/Hooks/useTruncate";

const Current = ({
  temperature,
  iconName,
  region,
  phenomenon,
  isFullMode,
  lightTheme,
  className,
  color,
}) => {
  return (
    <div
      className={cn(className, s.currentPlate, {
        [s.fullMode]: isFullMode,
        [s.lightTheme]: lightTheme,
      })}
    >
      <div className={s.locationGroup}>
        {isFullMode && <Icon iconName={"geoIcon"} />}
        <p className={s.region}>{region}</p>
      </div>
      <p className={s.phenomenon}>
        {!isFullMode ? useTruncate(phenomenon, 18) : phenomenon}
      </p>
      <Temperature
        className={s.temperature}
        temperature={temperature}
        size={isFullMode ? "full" : "small"}
      />
      <Icon iconName={iconName} color={color} />
    </div>
  );
};

export default Current;
