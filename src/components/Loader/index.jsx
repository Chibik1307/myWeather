import s from "./style.module.scss";
import Icon from "@/components/Icon";

const Loader = () => {
  return (
    <div className={s.container}>
      <Icon className={s.substrate} iconName={"loader"} />
      <div className={s.loader}>
        <div className={s.leftWrap}>
          <div className={s.loaderPart}></div>
        </div>
        <div className={s.rigthtWrap}>
          <div className={s.loaderPart}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
