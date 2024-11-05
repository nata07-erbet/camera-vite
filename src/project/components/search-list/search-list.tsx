import { SearchItem } from '../search-item/search-item';
import { TCamera } from '../../types/types';
import { useCallback, useEffect, useRef } from 'react';

type SearchListProps = {
  cameras: TCamera[];
};

function SearchList({ cameras }: SearchListProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const onScroll = useCallback(() => window.scrollY, []);


  useEffect(() => {
    const { current } = listRef;

    if(current) {
      current.addEventListener('scroll', onScroll);
      return () => {
        current.removeEventListener('scroll', onScroll);
      };
    }
  },[onScroll]);

  return(
    <ul
      style={{overflow: 'auto'}}
      className='form-search__select-list'
      onScroll={onScroll}
      ref={listRef}
    >
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
