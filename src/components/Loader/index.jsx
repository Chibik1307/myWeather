import s from "./style.module.scss";
import Icon from "@/components/Icon";

const Loader = () => {
  return (
    <div className={s.loader}>
      <div className={s.substrate} />
      <Icon iconName={"loader22"} />
    </div>
  );
};

export default Loader;
