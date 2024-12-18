import { ChangeEvent, useState } from 'react';
import { RateBarMap } from '../../../const/const';
function RateBar() {
  const [ rating, setRating ] = useState(0);

  const handleChangeRate = (key: HTMLInputElement): ChangeEvent => {
    setRating(key);
  };

  return(
    <>
      <div className="rate__group">
        {Object
          .entries(RateBarMap)
          .reverse()
          .map(([key, value]) => (
            <>
              <input
                className="visually-hidden"
                id={`star-${key}`}
                name="rate"
                type="radio"
                value={key}
                onChange={() => handleChangeRate(key)}
               />
              <label
                className="rate__label"
                htmlFor={`star-${key}`}
                title={value} />
            </>
          ))}

      </div>
      <div className="rate__progress">
        <span className="rate__stars">{rating}</span> <span>/</span>{" "}
        <span className="rate__all-stars">5</span>
      </div>
    </>
  );
}

export { RateBar }
