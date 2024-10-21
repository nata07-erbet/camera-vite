import { TCamera } from '../../types/types';
import { ProductCard } from '../product-card/product-card';
import { CATALOG_SHOW } from '../../const/const';

type ProductsListProps = {
  cameras: TCamera[];
  onOpen?: (id: TCamera['id']) => void;
};

function ProductsList({onOpen, cameras }: ProductsListProps) {

  const handleOpenPopUp = (id: TCamera['id']) => {
    onOpen?.(id);
  };

  return(
    <div className="cards catalog__cards" data-testid="product-container">
      {cameras
        .slice(0, CATALOG_SHOW)
        .map((camera) => (
          <ProductCard
            camera={camera}
            key={camera.id}
            onOpen={(id) => handleOpenPopUp(id)}
          />
        ))}
    </div>
  );
}

export { ProductsList };
