import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { DATE_FORMAT } from '../const/const';
import { TReview } from '../types/types';

const compareDate = (a: TReview, b: TReview) => {
  const dateA = new Date(a.createAt);
  const dateB = new Date(b.createAt);

  return Number(dateB) - Number(dateA);
};


const formatDate = (date: string) => dayjs(date).locale('ru').format(DATE_FORMAT);
export { formatDate, compareDate };

