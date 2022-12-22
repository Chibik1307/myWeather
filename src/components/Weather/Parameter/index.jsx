import s from "./style.module.scss";
import Icon from "@/components/Icon";

const Parameter = ({ iconName, children, color }) => {
  return (
    <div className={s.parameter}>
      <Icon iconName={iconName} color={color} />
      {children}
    </div>
  );
};

export default Parameter;
