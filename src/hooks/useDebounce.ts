import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void | Promise<void>,
  delay = 1000
) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const debouncedFn = useCallback(
    (...args: T) => {
      console.log(...args);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return debouncedFn;
};
