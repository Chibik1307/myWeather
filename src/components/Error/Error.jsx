import s from "./style.module.scss";
import Icon from "@/components/Icon";
import { useSettings } from "@/context/settingsContext";

const Error = ({ error }) => {
  const { staticAccentColor } = useSettings();
  const { icon, title, text, btnText, btnAction } = error;
  return (
    <div className={s.substrate}>
      <div className={s.error}>
        <Icon iconName={icon} />
        <h2>{title}</h2>
        <p>{text}</p>
        <button
          onClick={() => btnAction()}
          style={{ backgroundColor: staticAccentColor }}
          className={s.button}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default Error;
