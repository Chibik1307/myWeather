const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  if (!data) return;
  return JSON.parse(data);
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { setLocalStorage, getLocalStorage };
