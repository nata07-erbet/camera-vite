import { TCamera } from '../../types/types';

type SearchListProps = {
  cameras: TCamera[];
};

function SearchList({ cameras }: SearchListProps) {
  return(
    <ul className='form-search__select-list'>
      {cameras.map((camera) =>
        <li
          key={camera.id}
          className="form-search__select-item"
          tabIndex={0}>
          {camera.name}
        </li>
      )}
    </ul>
  );
}

export { SearchList };
