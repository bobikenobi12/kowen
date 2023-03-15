import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    try {
      setStoredValue(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const valueToStoreString = JSON.stringify(storedValue);
    window.localStorage.setItem(key, valueToStoreString);

    return () => {
      window.localStorage.removeItem(key);
    };
  }, [storedValue]);

  return [storedValue, setValue];
};
