import s from "./style.module.scss";
import cn from "classnames";

const Forecast = ({ children, className, lightTheme }) => {
  return (
    <div className={cn(className, s.forecast, { [s.lightTheme]: lightTheme })}>
      {children}
    </div>
  );
};

export default Forecast;
