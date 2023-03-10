import s from "./style.module.scss";
import cn from "classnames";
import Icon from "../../Icon";

const Toggle = ({
  className,
  title,
  toggleName,
  leftIcon,
  rightIcon,
  value,
  change,
}) => {
  return (
    <div className={cn(className, s.toggle)}>
      <div className={s.label}>
        <Icon iconName={toggleName} color={"#ffffff"}></Icon>
        <p>{title}</p>
      </div>
      <div onClick={() => change(!value)} className={s.button}>
        <Icon
          className={cn(s.leftIcon, { [s.active]: value })}
          iconName={leftIcon}
        ></Icon>
        <Icon
          className={cn(s.rightIcon, { [s.active]: !value })}
          iconName={rightIcon}
        ></Icon>
      </div>
    </div>
  );
};

export default Toggle;
