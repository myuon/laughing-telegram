import { useState } from "react";

export const useLocalStorage = <T>(_key: string, initValue: T) => {
  const key = "hooks:" + _key;
  const value = () => {
    try {
      const item = window.localStorage.getItem(key);
      return (item ? JSON.parse(item) : initValue) as T;
    } catch (error) {
      console.log(error);
      return initValue;
    }
  };
  const setValue = (value: T) => {
    try {
      setSavedValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };
  const [savedValue, setSavedValue] = useState(value);
  return [savedValue, setValue] as const;
};
