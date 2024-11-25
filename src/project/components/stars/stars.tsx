import { ALL_STARS } from '../../const/const';

type StarsProps = {
  rating: number;
};

function Stars({ rating }: StarsProps) {
  const iconStarFull = rating;
  const iconStar = ALL_STARS - iconStarFull;

  return(
    <>
      {Array.from({ length: iconStarFull }, (_, idx) => (
        <svg key={idx} width={17} height={16} aria-hidden="true" data-testid="star">
          <use xlinkHref="#icon-full-star" />
        </svg>
      ))}
      {Array.from({ length: iconStar }, (_, idx) => (
        <svg key={idx} width={17} height={16} aria-hidden="true">
          <use xlinkHref="#icon-star" />
        </svg>))}
    </>
  );
}

export { Stars };
