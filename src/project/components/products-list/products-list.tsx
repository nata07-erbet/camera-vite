import { TCamera } from '../../types/types';
import { ProductCard } from '../product-card/product-card';

type ProductsListProps = {
  cameras: TCamera[];
}
function ProductsList({ cameras }: ProductsListProps) {
  return(
    <div className="cards catalog__cards">
      {cameras.map((camera) => (
        <ProductCard
          camera={camera}
          key={camera.id}/>
      ))}
    </div>
  );
}

export { ProductsList };
