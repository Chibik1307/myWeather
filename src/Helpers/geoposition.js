import { getCity } from "./weather";

const getCurCoordinates = () => {
  const geo = navigator.geolocation;

  return new Promise((resolve, reject) => {
    geo.getCurrentPosition((success) => {
      return resolve(success);
    }),
      (error) => {
        return reject(error);
      };
  });
};

const getCityAdapter = async (query) => {
  try {
    const foundedCity = await getCity(query);
    return {
      name: foundedCity[0].name,
      id: foundedCity[0].id,
    };
  } catch (err) {
    return err;
  }
};

const getPositioning = async () => {
  try {
    const coordinates = await getCurCoordinates();
    const { latitude, longitude } = coordinates.coords;
    const city = await getCityAdapter(`${latitude},${longitude}`);
    return city;
  } catch (err) {
    return err;
  }
};

export { getPositioning, getCityAdapter };
