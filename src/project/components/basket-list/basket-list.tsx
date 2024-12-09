import { TCamera } from '../../types/types';
import { BasketItem } from '../basket-item/basket-item';
import { BASKET_AMOUNT } from '../../const/const';

type BasketListProps = {
  cameras: TCamera[];
  onDelete: () => void;
};

function BasketList({ cameras, onDelete }: BasketListProps) {
  return(
    <ul className="basket__list">
      {cameras && (
        cameras
        .slice(0, BASKET_AMOUNT)
        .map((camera) => <BasketItem camera={camera} onDelete={onDelete} /> )
      )}
    </ul>);
}

export { BasketList };
