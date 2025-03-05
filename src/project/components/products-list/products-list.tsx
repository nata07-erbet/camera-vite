import { TCamera } from '../../types/types';
import { ProductCard } from '../product-card/product-card';

type ProductsListProps = {
  cameras: TCamera[];
  onOpen?: (id: TCamera['id']) => void;
  idSuccess?: TCamera['id'];
};

function ProductsList({ onOpen, cameras, idSuccess }: ProductsListProps) {
  const handleOpenPopUp = (id: TCamera['id']) => {
    onOpen?.(id);
  };

  return (
    <div className="cards catalog__cards" data-testid="product-container">
      {cameras.map((camera) => (
        <ProductCard
          camera={camera}
          key={camera.id}
          onOpen={(id) => handleOpenPopUp(id)}
          idSuccess={idSuccess}
        />
      ))}
    </div>
  );
}

export { ProductsList };
