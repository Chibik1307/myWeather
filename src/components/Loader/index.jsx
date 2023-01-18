import s from "./style.module.scss";
import Icon from "@/components/Icon";

const Loader = () => {
  return (
<<<<<<< HEAD
    <div className={s.loader}>
      <div className={s.substrate} />
      <Icon iconName={"loader22"} />
=======
    <div className={s.container}>
      <div className={s.loader}>
        <div className={s.leftWrap}>
          <div className={s.loaderPart}></div>
        </div>
        <div className={s.rigthtWrap}>
          <div className={s.loaderPart}></div>
        </div>
      </div>
      <Icon iconName={"loader2"} />
>>>>>>> abd1a5dba684ad57c9068a27a20dd994d1747a17
    </div>
  );
};

export default Loader;
