import { useEffect, useRef, useState } from "react";

const useDynamicSvgImport = (iconName) => {
  const importedIconRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    const importSvgIcon = async () => {
      try {
        importedIconRef.current = (
          await import(`@/assets/${iconName}.svg`)
        ).ReactComponent;
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    importSvgIcon();
  }, [iconName]);

  return { error, loading, SvgIcon: importedIconRef.current };
};

export { useDynamicSvgImport };
