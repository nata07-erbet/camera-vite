import { TCamera } from '../../types/types';
import { Stars } from '../stars/stars';

type RateProps = {
  camera: TCamera;
};

function Rate({ camera }: RateProps) {
  const { rating, reviewCount } = camera;

  return (
    <div className="rate product__rate" data-testid="rate">
      <Stars rating={rating} />
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>{reviewCount}
      </p>
    </div>
  );
}

export { Rate };
