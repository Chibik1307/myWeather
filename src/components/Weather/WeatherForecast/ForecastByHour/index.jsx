import s from "./style.module.scss";
import cn from "classnames";

const Hour = ({ children }) => {
  return <div className={s.hour}>{children}</div>;
};

const Icon = ({ children }) => {
  return <div className={s.icon}>{children}</div>;
};

const Temp = ({ children }) => {
  return <div className={s.temp}>{children}</div>;
};

const ForecastByHour = ({ children, className }) => {
  return <div className={cn(className, s.hours)}>{children}</div>;
};

ForecastByHour.Hour = Hour;
ForecastByHour.Icon = Icon;
ForecastByHour.Temp = Temp;

export default ForecastByHour;
