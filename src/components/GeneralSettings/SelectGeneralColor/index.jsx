import s from "./style.module.scss";
import cn from "classnames";
import Icon from "../../Icon";

const SelectGeneralColor = ({ className, setColor, city }) => {
    const colors = [
    { key: "$blueAccent", value: "#349dea" },
    { key: "$orangeAccent", value: "#F06E18" },
    { key: "$greenAccent", value: "#13D386" },
    { key: "$purpleAccent", value: "#7F57F3" },
    { key: "$yellowAccent", value: "#E7D321" },
    { key: "$redAccent", value: "#F55C5C" },
  ];

  return (
    <div className={cn(className, s.selectColor)}>
      <Icon iconName={"color"}></Icon>
      <p>Цвета</p>
      <ul className={s.palette}>
        {colors.map((color, idx) => {
          return (
            <li
              key={idx}
              className={color.key}
              style={{ backgroundColor: color.value }}
              onClick={() => setColor(city, color.value)}
            ></li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectGeneralColor;
