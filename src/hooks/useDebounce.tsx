import {useEffect, useState} from 'react';

const useDebounce = (input: string = '', time: number = 500) => {
  const [value, setValue] = useState(input);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(input);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [input]);
  return {value};
};

export default useDebounce;
