import { useDynamicSvgImport } from "@/Hooks/useDynamicSvgImport.jsx";

const Icon = ({ iconName, ...rest }) => {
  const { loading, SvgIcon } = useDynamicSvgImport(iconName);
  const { color } = rest || "currentColor";

  if (SvgIcon && !loading) {
    return <SvgIcon style={{ color: color }} {...rest} />;
  }

  return null;
};

export default Icon;
