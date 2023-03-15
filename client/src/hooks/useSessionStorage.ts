// create a custom hook to use session storage with typescript typings and redux toolkit

import { useState, useEffect } from "react";

export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
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
    window.sessionStorage.setItem(key, valueToStoreString);

    return () => {
      window.sessionStorage.removeItem(key);
    };
  }, [storedValue]);

  return [storedValue, setValue];
};
