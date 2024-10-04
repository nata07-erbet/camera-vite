import { TCamera } from '../../types/types';
import { ALL_STARS } from '../../const/const';

type RateProps = {
  rate: TCamera['rating'];
};

function Rate({ rate }: RateProps) {
  const iconStarFull = rate;
  const iconStar = ALL_STARS - iconStarFull;

  return (
    <div className="rate product__rate">
      {Array.from({ length: iconStarFull }, () => (
        <svg key={rate} width={17} height={16} aria-hidden="true">
          <use xlinkHref="#icon-full-star" />
        </svg>
      ))}
      {Array.from({ length: iconStar }, () => (
        <svg key={rate} width={17} height={16} aria-hidden="true">
          <use xlinkHref="#icon-star" />
        </svg>))}
    </div>
  );
}

export { Rate };
