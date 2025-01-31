import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchReviews } from '../../store/action';
import classNames from 'classnames';
import { Review } from '../../components/review/review';
import { compareDate } from '../../utils/utils';
import { REVIEW_SHOW } from '../../const/const';


type ReviewsProps = {
  onClickAddReview: () => void;
  cameraId: number
};

function ReviewsList({ onClickAddReview, cameraId }: ReviewsProps) {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviews(cameraId))
  }, []);
  
  const [ reviewShowCount, setReviewShowCount ] = useState<number>(REVIEW_SHOW);
  const classButtonHidden = classNames('btn', 'btn--purple', {
    'visually-hidden': reviews.length <= reviewShowCount,
  });

  const handleClickShowReviews = () => {
    setReviewShowCount((prevState) => prevState + REVIEW_SHOW);
  };

  const handleClickAddReview = () => {
    onClickAddReview();
  };

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button
            className="btn"
            type="button"
            onClick={handleClickAddReview}
          >
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">
          {[...reviews]
            .sort(compareDate)
            .slice(0, reviewShowCount)
            .map((review) => (
              <Review reviewItem={review} key={review.id} />
            ))}
        </ul>
        <div className="review-block__buttons">
          <button
            className={classButtonHidden}
            type="button"
            onClick={handleClickShowReviews}
          >
            Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
}

export { ReviewsList };
