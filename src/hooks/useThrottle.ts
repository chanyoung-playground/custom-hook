import { useEffect, useRef } from 'react';

export const useThrottle = <T extends unknown[]>(
  callback: (...params: T) => void,
  time = 1000
) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextArgs = useRef<T>();

  const throttledFn = (...args: T) => {
    if (!timeout.current) {
      callback(...args);

      const timeoutCallback = () => {
        if (nextArgs.current) {
          callback(...nextArgs.current);
          nextArgs.current = undefined;

          timeout.current = setTimeout(timeoutCallback, time);
          return;
        }
        timeout.current = undefined;
      };

      timeout.current = setTimeout(timeoutCallback, time);
      return;
    }
    nextArgs.current = args;
  };

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return throttledFn;
};
