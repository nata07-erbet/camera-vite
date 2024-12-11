import { ChangeEvent, useState } from 'react';
import { MIN_CAMERA, MAX_CAMERA } from '../../const/const';


function Quantity () {
  const [ initCount, setInitCount ] = useState(1);

  const isValid = (count: number) => {
    if(count >= MIN_CAMERA && count <= MAX_CAMERA) {
      return count;
    } else if(count > MAX_CAMERA) {
      return MAX_CAMERA;
    }
  }

  const handleClickDec = () => {
    setInitCount((prevState) => prevState - 1);
  };

  const handleClickInc = () => {
    setInitCount((prevState) => prevState + 1);
  };

  const handleClickAddValue = (evt: ChangeEvent<HTMLInputElement>) => {
    const count = Number(evt.target.value);
    isValid(count);
    setInitCount(count);
  };

 return(
  <div className="quantity">
    <button
      className="btn-icon btn-icon--prev"
      aria-label="уменьшить количество товара"
      onClick={handleClickDec}
    >
      <svg width={7} height={12} aria-hidden="true">
        <use xlinkHref="#icon-arrow" />
      </svg>
    </button>
    <label className="visually-hidden" htmlFor="counter1" />
    <input
      type="number"
      id="counter1"
      min={1}
      max={99}
      aria-label="количество товара"
      value={isValid(initCount)}
      onChange={handleClickAddValue}
    />
    <button
      className="btn-icon btn-icon--next"
      aria-label="увеличить количество товара"
      onClick={handleClickInc}
    >
      <svg width={7} height={12} aria-hidden="true">
        <use xlinkHref="#icon-arrow" />
      </svg>
    </button>
  </div>
 );
};

export { Quantity }


