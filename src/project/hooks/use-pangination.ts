import { useState } from 'react';
import { MAX_PAGES_IN_RANGE } from '../const/const';

type TUsePaginationProps  = {
  amountCatalogPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

type TUsePaginationReturn = {
  currentPage: number;
  currentRange: number[];
  setPage: (number: number) => void;
  prevPage: number | null;
  nextPage: number | null;
}

function usePangination ({ amountCatalogPages, currentPage, onPageChange }: TUsePaginationProps): TUsePaginationReturn {
  const arr = Array.from({ length: amountCatalogPages }, (_, i) => i + 1);

  const ranges: number[][] = arr.reduce((acc, page, index) => {
    const rangeIndex = Math.floor(index / MAX_PAGES_IN_RANGE );
    if(!acc[rangeIndex]) {
      acc[rangeIndex] = [];
    }
    acc[rangeIndex].push(page);
    return acc;
  }, [] as [][]);

  const initRangeIndex = ranges.findIndex((range) => range.includes(currentPage));
  const [ currentRangeIndex, setCurrentRangeIndex ] =  useState(initRangeIndex);
  const currentRange = ranges[currentRangeIndex];

  const prevPage = (currentRange && currentRange[0] > 1 )? currentRange[0] - 1 : null;
  const nextPage = (currentRange && currentRange[currentRange.length - 1] < amountCatalogPages)
   ? currentRange[currentRange.length - 1] + 1 : null;

   const setPage = (page: number) => {
    onPageChange(page);

    if([prevPage].includes(page)){
      setCurrentRangeIndex((prevState) => prevState - 1);
    } else if([nextPage].includes(page)) {
      setCurrentRangeIndex((prevState) => prevState + 1);
    }
   }

  return { currentPage,
    currentRange,
    setPage,
    prevPage,
    nextPage}
};

export { usePangination };

