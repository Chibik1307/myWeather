import s from "./style.module.scss";
import cn from "classnames";

const Details = ({ children, lightTheme }) => {
  return (
    <div className={cn(s.details, { [s.lightTheme]: lightTheme })}>
      {children}
    </div>
  );
};

export default Details;
