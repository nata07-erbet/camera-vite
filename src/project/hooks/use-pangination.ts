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
  previousPage: number | null;
  nextPage: number | null;
}

function usePangination ({ amountCatalogPages, currentPage,  onPageChange  }: TUsePaginationProps): TUsePaginationReturn {

};

export { usePangination };

