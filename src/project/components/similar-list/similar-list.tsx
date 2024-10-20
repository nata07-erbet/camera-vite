import { ProductCard } from '../product-card/product-card';
import { TCamera } from '../../types/types';

type SimilarListProps = {
  similars: TCamera[];
};

function SimilarList({ similars }: SimilarListProps) {
  return(
    similars.map((similar) => <ProductCard camera={similar} key={similar.id}/>)
  );
}

export { SimilarList };
