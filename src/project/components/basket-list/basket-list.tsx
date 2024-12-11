import { TCamera } from '../../types/types';
import { BasketItem } from '../basket-item/basket-item';
import { BASKET_AMOUNT } from '../../const/const';

type BasketListProps = {
  cameras: TCamera[];
  onDelete: () => void;
  isRemoveItem: boolean;
};

function BasketList({ cameras, onDelete, isRemoveItem }: BasketListProps) {
  return(
    <ul className="basket__list">
      {cameras && (
        cameras
        .slice(0, BASKET_AMOUNT)
        .map((camera) => <BasketItem
                          camera={camera}
                          onDelete={onDelete}
                          isRemoveItem={isRemoveItem}
                          />)
      )}
    </ul>);
}

export { BasketList };
