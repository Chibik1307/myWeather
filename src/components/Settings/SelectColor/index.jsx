import s from "./style.module.scss";
import cn from "classnames";
import Icon from "@/components/Icon";

const SelectColor = ({ className, setColor, city }) => {
  const colors = [
    {
      key: "$blueAccent",
      value: "#349dea",
    },
    {
      key: "$orangeAccent",
      value: "#ff9701",
    },
    {
      key: "$greenAccent",
      value: "#2fce78",
    },
    {
      key: "$purpleAccent",
      value: "#7750ec",
    },
    {
      key: "$yellowAccent",
      value: "#e7d321",
    },
    {
      key: "$redAccent",
      value: "#f55c5c",
    },
  ];

  return (
    <div className={cn(className, s.selectColor)}>
      <Icon iconName={"color"} color={"#ffffff"}></Icon>
      <p>Цвета</p>
      <ul className={s.palette}>
        {colors.map((color, idx) => {
          const isActive = color.value === city.color;
          return (
            <li
              key={idx}
              className={cn(color.key, { [s.active]: isActive })}
              style={{ background: color.value }}
              onClick={() => setColor(city, color.value)}
            ></li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectColor;
