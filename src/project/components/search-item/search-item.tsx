import { Link, generatePath} from 'react-router-dom';
import { TCamera } from '../../types/types';

type SearchItemProps = {
  camera: TCamera;
};

function SearchItem({ camera }: SearchItemProps) {
  const href = generatePath('/camera/:id',{
    id: `${camera.id}`
  });

  return(
    <Link to={href}>
      <li
        key={camera.id}
        className="form-search__select-item"
        tabIndex={0}
      >
        {camera.name}
      </li>
    </Link>
  );
}

export { SearchItem };

