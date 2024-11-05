import { SearchItem } from '../search-item/search-item';
import { TCamera } from '../../types/types';
import { useCallback, useEffect } from 'react';

type SearchListProps = {
  cameras: TCamera[];
};

function SearchList({ cameras }: SearchListProps) {
  const onScroll = useCallback(() => window.scrollY, []);


  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  },[onScroll]);

  return(
    <ul
      style={{overflow: 'auto'}}
      className='form-search__select-list'
      onScroll={onScroll}
    >
      {scroll}
      {cameras .map((camera) =>
        <SearchItem
          camera={camera}
          key={camera.id}
        />
      )}
    </ul>
  );
}

export { SearchList };
