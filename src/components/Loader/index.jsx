import s from "./style.module.scss";

const Loader = () => {
  return (
    <div className={s.loader}>
      <div className={s.container}>
        {/* <div className={s.circle}></div> */}
        <div className={s.ray}></div>
        <div className={s.ray}></div>
        <div className={s.ray}></div>
        <div className={s.ray}></div>
        <div className={s.ray}></div>
        <div className={s.ray}></div>
        <div className={s.ray}></div>
        <div className={s.ray}></div>
      </div>
    </div>
  );
};

export default Loader;
