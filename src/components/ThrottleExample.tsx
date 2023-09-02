import { useEffect } from 'react';
import { useThrottle } from '../hooks/useThrottle';

export const ThrottleExample = () => {
  const storePosition = useThrottle(() => {
    console.log('scrolly', `${window.scrollY}`);
  }, 1000);

  useEffect(() => {
    window.addEventListener('scroll', storePosition);

    return () => {
      window.removeEventListener('scroll', storePosition);
    };
  }, []);

  return <div style={{ height: '2000px' }}></div>;
};
