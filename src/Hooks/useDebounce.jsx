const useDebounce = (callback, delay = 500) => {
  return function (...args) {
    if (useDebounce.lastIdTimeout) {
      clearTimeout(useDebounce.lastIdTimeout);
    }
    useDebounce.lastIdTimeout = setTimeout(() => {
      return callback(...args);
    }, delay);
  };
};
export default useDebounce;
