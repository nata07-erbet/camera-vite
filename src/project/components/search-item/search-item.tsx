import { useState } from 'react';
import { Link, generatePath} from 'react-router-dom';
import { TCamera } from '../../types/types';

type SearchItemProps = {
  camera: TCamera;
};

function SearchItem({ camera }: SearchItemProps) {
  const [ isFocused, setIsFocused ] = useState(false);


  const href = generatePath('/camera/:id',{
    id: `${camera.id}`
  });


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return(
    <Link to={href}>
      <li
        key={camera.id}
        className="form-search__select-item"
        tabIndex={camera.id}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          outline: isFocused
            ? '2px solid #7575e2' //  уточнить
            : 'none'
        }}
      >
        {camera.name}
      </li>
    </Link>
  );
}

export { SearchItem };

