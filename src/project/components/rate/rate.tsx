import { TCamera } from '../../types/types';
import { ALL_STARS } from '../../const/const';

type RateProps = {
  camera: TCamera;
};

function Rate({ camera }: RateProps) {
  const { rating, reviewCount } = camera;

  const iconStarFull = rating;
  const iconStar = ALL_STARS - iconStarFull;

  return (
    <div className="rate product__rate">
      {Array.from({ length: iconStarFull }, () => (
        <svg key={rating} width={17} height={16} aria-hidden="true">
          <use xlinkHref="#icon-full-star" />
        </svg>
      ))}
      {Array.from({ length: iconStar }, () => (
        <svg key={rating} width={17} height={16} aria-hidden="true">
          <use xlinkHref="#icon-star" />
        </svg>))}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>{reviewCount}
      </p>
    </div>
  );
}

export { Rate };
