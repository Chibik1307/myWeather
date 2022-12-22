import s from "./style.module.scss";
import cn from "classnames";

const Temperature = ({ temperature, size }) => {
  const { degrees, scale } = temperature;
  return (
    <div className={cn(s.temperature, s[size])}>
      {degrees}
      {scale}
    </div>
  );
};

export default Temperature;
