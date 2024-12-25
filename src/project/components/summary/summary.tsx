import { localStoreBasket } from '../../store/local-store-basket';
import {  DiscountMap, QuantityMap, SummaryMap, DiscountSummaryMap } from '../../const/const';

type SummaryProps = {
  onSubmit: () => void;
};

function Summary ({ onSubmit }: SummaryProps){
  const prices =  localStoreBasket && localStoreBasket.map((basket) => basket.price * basket.quantity);
  // const totalSummary = prices.length !== 0
  //   ? prices.reduce((prevValue: number, currentValue: number) => prevValue + currentValue)
  //   : 0;

    const totalSummary = 10000 ;
    const totalQuantities = 7;

    const quantities =localStoreBasket && localStoreBasket.map((basket) => basket.quantity);
    // const totalQuantities = quantities.length !== 0
    //   ? quantities.reduce((prevValue: number, currentValue: number) => prevValue + currentValue)
    //   : 0;

    console.log(totalQuantities);

    const calcTotalSumDiscount = (total: number) => {
    if(total === QuantityMap.firstStep) {
      return  totalSummary - totalSummary * (DiscountMap.firstLevel / 100);
    } else if(
      total >=  QuantityMap.secondStepStart
      && total <= QuantityMap.secondStepEnd) {
        return totalSummary - totalSummary * (DiscountMap.secondLevel / 100);
    } else if(
        total >= QuantityMap.thirdStepStart &&
        total <= QuantityMap.fourthStep) {
          return totalSummary - totalSummary * (DiscountMap.thirdLevel / 100)
    } else if(total >= QuantityMap.fourthStep) {
      return totalSummary - totalSummary * (DiscountMap.fourthLevel / 100)
    } else {
      return totalSummary;
    }};

    const calcTotalSumDiscountSecond = (total: number) => {
    if(total === QuantityMap.firstStep) {
      return  totalSummary - totalSummary * ((DiscountMap.firstLevel - DiscountSummaryMap.second) / 100);
    } else if(
      total >=  QuantityMap.secondStepStart
      && total <= QuantityMap.secondStepEnd) {
        return totalSummary - totalSummary * ((DiscountMap.secondLevel  - DiscountSummaryMap.second) / 100);
    } else if(
        total >= QuantityMap.thirdStepStart &&
        total <= QuantityMap.fourthStep) {
          return totalSummary - totalSummary * ((DiscountMap.thirdLevel - DiscountSummaryMap.second) / 100)
    } else if(total >= QuantityMap.fourthStep) {
      return totalSummary - totalSummary * ((DiscountMap.fourthLevel  - - DiscountSummaryMap.second) / 100)
    } else {
      return totalSummary;
    }};

    const calcTotalSumDiscountThird = (total: number) => {
      if(total === QuantityMap.firstStep) {
        return  totalSummary - totalSummary * (DiscountMap.firstLevel / 100);
      } else if(
        total >=  QuantityMap.secondStepStart
        && total <= QuantityMap.secondStepEnd) {
          return totalSummary - totalSummary * (DiscountMap.secondLevel / 100);
      } else if(
          total >= QuantityMap.thirdStepStart &&
          total <= QuantityMap.fourthStep) {
            return totalSummary - totalSummary * (DiscountMap.thirdLevel / 100)
      } else if(total >= QuantityMap.fourthStep) {
        return totalSummary - totalSummary * (DiscountMap.fourthLevel / 100)
      } else {
        return totalSummary;
      }};

    const calcTotalSumDiscountForth = (total: number) => {
      if(total === QuantityMap.firstStep) {
        return  totalSummary - totalSummary * (DiscountMap.firstLevel / 100);
      } else if(
        total >=  QuantityMap.secondStepStart
        && total <= QuantityMap.secondStepEnd) {
          return totalSummary - totalSummary * (DiscountMap.secondLevel / 100);
      } else if(
          total >= QuantityMap.thirdStepStart &&
          total <= QuantityMap.fourthStep) {
            return totalSummary - totalSummary * (DiscountMap.thirdLevel / 100)
      } else if(total >= QuantityMap.fourthStep) {
        return totalSummary - totalSummary * (DiscountMap.fourthLevel / 100)
      } else {
        return totalSummary;
    }};


  // const calcAllTotalSum = (total: number, sum: number) => {
  //   if(sum < SummaryMap.firstStage) {
  //     calcTotalSumDiscount(total);
  //   } else return sum;
  // };

  const handleOrderSubmit = () =>{
    onSubmit;
  };

  return(
    <form
      onSubmit={handleOrderSubmit}
      method="post"
    >
      <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{totalSummary} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className="basket__summary-value basket__summary-value--bonus">
        {totalQuantities} ₽
        </span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">
          К оплате:
        </span>
        <span className="basket__summary-value basket__summary-value--total">
          {calcTotalSumDiscountSecond(totalQuantities)} ₽
        </span>
      </p>
      <button
        className="btn btn--purple"
        type="submit"
        disabled={localStoreBasket.length === 0}
        onClick={handleOrderSubmit}
      >
        Оформить заказ
      </button>
    </div>
    </form>
  );
};

export { Summary };
