import { TCamera } from '../../types/types';
import { BasketItem } from '../basket-item/basket-item';
import { BASKET_AMOUNT } from '../../const/const';

type BasketListProps = {
  cameras: TCamera[];
  onDeleteFromBasket: (id:TCamera['id']) => void;
  selectedId?: TCamera['id'] | null;
  isSending: boolean;
};

function BasketList({ cameras, onDeleteFromBasket, selectedId, isSending }: BasketListProps) {
  return(
    <ul className="basket__list">
      {cameras && (
        cameras
          .slice(0, BASKET_AMOUNT)
          .map((camera) => (<BasketItem
            key={camera.id}
            camera={camera}
            onDeleteFromBasket={onDeleteFromBasket}
            selectedId={selectedId}
            isSending={isSending}
          />)))}
    </ul>);
}

export { BasketList };
