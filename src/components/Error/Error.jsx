import s from "./style.module.scss";
import Icon from "@/components/Icon";

const Error = ({ error }) => {
  const { icon, title, text, btnText } = error;
  return (
    <div className={s.error}>
      <div className={s.iconGroup}>
        <Icon iconName={icon} />
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
      <button onClick={() => {}} className={s.button}>
        {btnText}
      </button>
    </div>
  );
};

export default Error;
