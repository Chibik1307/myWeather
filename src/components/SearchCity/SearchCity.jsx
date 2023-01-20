import s from "./style.module.scss";
import cn from "classnames";
import { getCity } from "@/Helpers/weather";
import useDebounce from "@/Hooks/useDebounce";
import { useState, useRef } from "react";
import Icon from "@/components/Icon";
import { useSettings } from "../../context/settingsContext";

const SearchCity = ({ getCityWeather, className }) => {
  const inputEl = useRef(null);
  const { setIsLoading } = useSettings();
  const [inputActive, setInputActive] = useState(false);
  const [selectCity, setSelectCity] = useState("");
  const [listValue, setListValue] = useState(null);

  const isShowList = listValue && selectCity.length > 1;

  const setFocus = () => {
    inputEl.current.focus();
    setInputActive(true);
    if (listValue === null) {
      setSelectCity("");
    }
  };

  const setBlur = () => {
    setInputActive(!inputActive);
  };

  const loadCities = async (query) => {
    if (!query) return;
    const cities = await getCity(query);
    setListValue(cities.map((item) => item.name));
  };

  const debouncedGetCity = useDebounce(loadCities, 200);

  const handleChangeInput = (e) => {
    setSelectCity(e.target.value);
    debouncedGetCity(e.target.value);
  };

  const handleClick = (item) => () => {
    setSelectCity(item);
    setListValue(null);
  };

  const acceptCelectCity = async (city) => {
    setIsLoading(true);
    await getCityWeather(city);
    setSelectCity("");
    setIsLoading(false);
  };

  const renderList = () => {
    if (listValue === null || selectCity.length < 2) {
      return null;
    }
    if (listValue && !listValue.length) {
      return (
        <div className={cn(s.nothingToShow)}>
          <p>Ничего не найдено</p>
        </div>
      );
    }
    return (
      <ul
        className={cn(s.list, {
          [s.active]: isShowList,
        })}
      >
        {listValue.map((item, idx) => {
          return (
            <li onClick={handleClick(item)} key={idx}>
              {item}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={className}>
      <div
        onClick={setFocus}
        className={cn(s.inputGroup, {
          [s.active]: inputActive,
          [s.showList]: isShowList,
        })}
      >
        <Icon
          iconName={"search"}
          className={cn(s.search, { [s.active]: inputActive })}
        />
        <input
          className={s.input}
          value={selectCity}
          onInput={handleChangeInput}
          ref={inputEl}
          onBlur={setBlur}
        ></input>
        <Icon
          onClick={() => acceptCelectCity(selectCity)}
          iconName={"rightArrow"}
          className={cn(s.arrow, { [s.active]: !inputActive })}
        />
      </div>
      {renderList()}
    </div>
  );
};

export default SearchCity;
