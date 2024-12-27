import { useState } from 'react';
import classNames from 'classnames';
import { ReqRoutes } from '../../const/const';
import { api } from '../../api/api';
import { TOrder } from '../../types/types';
import { localStoreBasket } from '../../store/local-store-basket';
import { DiscountMap, QuantityMap, SummaryMap, DiscountSummaryMap } from '../../const/const';

type SummaryProps = {
  onSending: () => void;
  onSubmit: () => void;
  onError: () => void;
};

function Summary ({onSending, onSubmit, onError }: SummaryProps){
  const [ isSending, setIsSending ] = useState(false);

  const promoCameras = localStoreBasket && localStoreBasket.filter((camera) => camera.isPromo === true);
  const promoCamerasPrices = promoCameras && promoCameras.map((camera) => camera.price * camera.quantity);
  const totalSummaryPromo = promoCamerasPrices.length !== 0
    ? promoCamerasPrices.reduce((previousValue, currentIndex) => previousValue + currentIndex)
    : 0;

  const notPromoCameras = localStoreBasket.filter((camera) => camera.isPromo === false);
  const notPromoCamerasPrices = notPromoCameras && notPromoCameras.map((basket) => basket.price * basket.quantity);
  const totalSummaryNotPromo = notPromoCamerasPrices.length !== 0
    ? notPromoCamerasPrices.reduce((prevValue: number, currentValue: number) => prevValue + currentValue)
    : 0;

  const totalSummary = totalSummaryPromo + totalSummaryNotPromo;
    const quantities = localStoreBasket && localStoreBasket.map((basket) => basket.quantity);
    const totalQuantities = quantities.length !== 0
      ? quantities.reduce((prevValue: number, currentValue: number) => prevValue + currentValue)
      : 0;

    const calcTotalSumDiscount = (total: number) => {
    if(total === QuantityMap.firstStep) {
      return totalSummary - totalSummary * (DiscountMap.firstLevel / 100);
    } else if(
      total >= QuantityMap.secondStepStart
      && total <= QuantityMap.secondStepEnd) {
        return totalSummary - totalSummary * (DiscountMap.secondLevel / 100);
    } else if(
        total >= QuantityMap.thirdStepStart &&
        total <= QuantityMap.fourthStep) {
          return totalSummary - totalSummary * (DiscountMap.thirdLevel / 100);
    } else if(total >= QuantityMap.fourthStep) {
      return totalSummary - totalSummary * (DiscountMap.fourthLevel / 100);
    } else {
      return totalSummary;
    }};

   const calcTotalSumDiscountSecond = (total: number) => {
    if(total === QuantityMap.firstStep) {
      return totalSummary - totalSummary * ((DiscountMap.firstLevel - DiscountSummaryMap.second) / 100);
    } else if(
      total >= QuantityMap.secondStepStart
      && total <= QuantityMap.secondStepEnd) {
        return totalSummary - totalSummary * ((DiscountMap.secondLevel - DiscountSummaryMap.second) / 100);
    } else if(
        total >= QuantityMap.thirdStepStart &&
        total <= QuantityMap.fourthStep) {
          return totalSummary - totalSummary * ((DiscountMap.thirdLevel - DiscountSummaryMap.second) / 100);
    } else if(total >= QuantityMap.fourthStep) {
      return totalSummary - totalSummary * ((DiscountMap.fourthLevel - DiscountSummaryMap.second) / 100);
    } else {
      return totalSummary;
    }
  };

    const calcTotalSumDiscountThird = (total: number) => {
      if(total === QuantityMap.firstStep) {
        return totalSummary - totalSummary * ((DiscountMap.firstLevel - DiscountSummaryMap.third) / 100);
      } else if(
        total >= QuantityMap.secondStepStart
        && total <= QuantityMap.secondStepEnd) {
          return totalSummary - totalSummary * ((DiscountMap.secondLevel - DiscountSummaryMap.third) / 100);
      } else if(
          total >= QuantityMap.thirdStepStart &&
          total <= QuantityMap.fourthStep) {
            return totalSummary - totalSummary * ((DiscountMap.thirdLevel - DiscountSummaryMap.third)/ 100);
      } else if(total >= QuantityMap.fourthStep) {
        return totalSummary - totalSummary * ((DiscountMap.fourthLevel - DiscountSummaryMap.third) / 100);
      } else {
        return totalSummary;
      }
    };

    const calcTotalSumDiscountForth = (total: number) => {
      if(total === QuantityMap.firstStep) {
        return totalSummary - totalSummary * ((DiscountMap.firstLevel - DiscountSummaryMap.fourth) / 100);
      } else if(
        total >= QuantityMap.secondStepStart
        && total <= QuantityMap.secondStepEnd) {
          return totalSummary - totalSummary * ((DiscountMap.secondLevel - DiscountSummaryMap.fourth) / 100);
      } else if(
          total >= QuantityMap.thirdStepStart &&
          total <= QuantityMap.fourthStep) {
            return totalSummary - totalSummary * ((DiscountMap.thirdLevel - DiscountSummaryMap.fourth) / 100);
      } else if(total >= QuantityMap.fourthStep) {
        return totalSummary - totalSummary * ((DiscountMap.fourthLevel - - DiscountSummaryMap.fourth) / 100);
      } else {
        return totalSummary;
    }};


  const calcAllTotalSum = (total: number, sum: number) => {
    if(sum < SummaryMap.firstStage) {
      calcTotalSumDiscount(total);
    } else if(
      sum >= SummaryMap.firstStage && sum <= SummaryMap.secondStage
    ){
      return calcTotalSumDiscountSecond(total);
    } else if(
      sum >= SummaryMap.secondStage && sum <= SummaryMap.thirdStage) {
        return calcTotalSumDiscountThird(total);
      } else if(sum > SummaryMap.thirdStage) {
        return calcTotalSumDiscountForth(total);
      } else {
        return calcTotalSumDiscount(total);
      };
    return calcTotalSumDiscount(total);
  };

  const getAllTotalSum = (total: number, sum: number) => {
   return calcAllTotalSum(total, sum);
  };

  const getFormat = (value: number) => {
    return (Math.floor(value)).toLocaleString('ru');
  };

  const totalSum = totalSummary;
  const allTotalSum = getAllTotalSum(totalQuantities, totalSummary);

  const discountSummary = allTotalSum && totalSum - allTotalSum;

  const isActive = discountSummary && discountSummary !== 0 ? true : false;
  const classColor = classNames('basket__summary-value', {'basket__summary-value--bonus': isActive});

  const handleOrderSubmit = () => {
    setIsSending(true);
    onSending();

    const orderData: TOrder = {
      camerasIds: localStoreBasket.map((camera) => camera.id),
      coupon: 'camera-333'
    };

    api
      .post (ReqRoutes.Orders, orderData)
      .then((response) => {
        console.log(response);
        onSubmit;
      })
      .catch((err) => {
        console.log(err);
        onError;
      });
  };

  return(
    <form
      onSubmit={handleOrderSubmit}
      method="post"
    >
    <div className="basket__summary-order">
    <p className="basket__summary-item">
      <span className="basket__summary-text">Всего:</span>
      <span className="basket__summary-value">{getFormat(totalSummary)} ₽</span>
    </p>
    <p className="basket__summary-item">
      <span className="basket__summary-text">Скидка:</span>
      <span className={classColor}>
        {getFormat(discountSummary)} ₽
      </span>
    </p>
    <p className="basket__summary-item">
      <span className="basket__summary-text basket__summary-text--total">
        К оплате:
      </span>
      <span className="basket__summary-value basket__summary-value--total">
        {getFormat(allTotalSum)} ₽
      </span>
    </p>
    <button
      className="btn btn--purple"
      type="submit"
      disabled={localStoreBasket.length === 0 || isSending }
    >
      Оформить заказ
    </button>
    </div>
    </form>
  );
}

export { Summary };
