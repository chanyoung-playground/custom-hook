import { ChangeEventHandler, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export const DebounceExample = () => {
  const [text, setText] = useState('');

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = useDebounce(
    (e) => {
      setText(e.target.value);
    },
    900
  );

  return (
    <div>
      <input onChange={handleTextChange} />
      <p>{text}</p>
    </div>
  );
};
