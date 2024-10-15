import { TReview } from '../../types/types';
import { Stars } from '../stars/stars';
import { formatDate } from '../../utils/utils';

type ReviewProps = {
  reviewItem: TReview;
};

function Review({ reviewItem }: ReviewProps) {
  const { id, userName, rating, createAt, advantage, disadvantage, review } = reviewItem;
  const dateFormat = formatDate(createAt);

  return (
    <li className="review-card" key={id}>
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime={dateFormat}>
          {dateFormat}
        </time>
      </div>
      <div className="rate review-card__rate">
        <Stars rating={rating} />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">
            {disadvantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {review}
          </p>
        </li>
      </ul>
    </li>
  );
}

export { Review };
