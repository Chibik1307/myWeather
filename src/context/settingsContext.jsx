import { createContext, useContext, useEffect, useState } from "react";
import { setLocalStorage, getLocalStorage } from "@/Hooks/useLocalStorage";

const SettingsContext = createContext({});

export const useSettings = () => {
  return useContext(SettingsContext);
};

const SettingsProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowGeneralSettings, setIsShowGeneralSettings] = useState(false);

  useEffect(() => {
    setLocalStorage("settings", cities);
  }, [cities]);

  const setMode = (city) => {
    const newCities = cities.map((item) => {
      if (item.id === city.id) {
        item.isFullMode = !item.isFullMode;
      }
      return item;
    });

    setCities(newCities);
  };

  const setShowForecast = (city) => {
    const newCities = cities.map((item) => {
      if (item.id === city.id) {
        item.isShowForecast = !item.isShowForecast;
      }
      return item;
    });

    setCities(newCities);
  };

  const setTheme = (city) => {
    const newCities = cities.map((item) => {
      if (item.id === city.id) {
        item.isLightTheme = !item.isLightTheme;
      }
      return item;
    });

    setCities(newCities);
  };

  const setScale = (city) => {
    const newCities = cities.map((item) => {
      if (item.id === city.id) {
        item.isCelsius = !item.isCelsius;
      }
      return item;
    });

    setCities(newCities);
  };

  const setShowSettings = (city) => {
    const newCities = cities.map((item) => {
      if (item.id === city.id) {
        item.isShowSettings = !item.isShowSettings;
      }
      return item;
    });

    setCities(newCities);
  };

  const setColor = (city, color) => {
    const newCities = cities.map((item) => {
      if (item.id === city.id) {
        item.color = color;
      }
      return item;
    });

    setCities(newCities);
  };

  const addCity = (city) => {
    const isCityExist = () => cities.find((item) => item.id === city.id);

    if (isCityExist()) return;

    const newCities = [
      ...cities,
      {
        ...city,
        isFullMode: true,
        setMode,
        isShowForecast: false,
        setShowForecast,
        isLightTheme: false,
        setTheme,
        isCelsius: true,
        setScale,
        isShowSettings: false,
        setShowSettings,
        color: "#349dea",
      },
    ];

    setCities(newCities);
  };

  const removeCity = (city) => {
    const newCitiesList = cities.filter((item) => item.id !== city.id);
    setCities(newCitiesList);
  };

  const settings = {
    addCity,
    removeCity,
    setMode,
    setShowForecast,
    setTheme,
    setScale,
    setShowSettings,
    setColor,
    cities,
    setCities,
    isShowGeneralSettings,
    setIsShowGeneralSettings,
    isLoading,
    setIsLoading,
  };

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
