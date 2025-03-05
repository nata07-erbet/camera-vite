import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import {
  CamerasMap,
  CategoryMap,
  DATE_FORMAT,
  LevelMap,
  CATALOG_SHOW,
} from '../const/const';
import {
  TCamera,
  TFilterPriceRange,
  TFiltersData,
  TLevel,
  TLevelValue,
  TReview,
  TSortKey,
  TType,
  TTypeValue,
} from '../types/types';

const compareDate = (a: TReview, b: TReview) => {
  const dateA = new Date(a.createAt);
  const dateB = new Date(b.createAt);

  return Number(dateB) - Number(dateA);
};
const formatDate = (date: string) =>
  dayjs(date).locale('ru').format(DATE_FORMAT);

const comparePrice = (a: TCamera, b: TCamera) => a.price - b.price;
const compareRating = (a: TCamera, b: TCamera) => a.rating - b.rating;

const compare = (sortKey: TSortKey, cameras: TCamera[]): TCamera[] => {
  const camerasCopy = [...cameras];
  switch (sortKey) {
    case 'price-up':
      return camerasCopy.sort(comparePrice);

    case 'price-down':
      return camerasCopy.sort(comparePrice).reverse();

    case 'popular-up':
      return camerasCopy.sort(compareRating);

    case 'popular-down':
      return camerasCopy.sort(compareRating).reverse();

    default:
      return cameras;
  }
};

const getMinMaxPrices = (cameras: TCamera[]): Partial<TFilterPriceRange> => {
  if (cameras.length === 0) {
    return [undefined, undefined];
  }
  const prices = cameras.map((camera) => camera.price);
  return [Math.min(...prices), Math.max(...prices)];
};

const getKeyByValueType = (value: TTypeValue): TType =>
  Object.keys(CamerasMap).find(
    (key) => CamerasMap[key as TType] === value,
  ) as TType;

const getKeyByValueLevel = (value: TLevelValue): TLevel =>
  Object.keys(LevelMap).find(
    (key) => LevelMap[key as TLevel] === value,
  ) as TLevel;

const filterCameras = (products: TCamera[], currentFilters: TFiltersData) =>
  products.filter(
    (product) =>
      (!currentFilters?.category ||
        product.category === CategoryMap[currentFilters.category]) &&
      (currentFilters.types.length === 0 ||
        (currentFilters.types.includes(getKeyByValueType(product.type)) &&
          (currentFilters.levels.length === 0 ||
            currentFilters.levels.includes(
              getKeyByValueLevel(product.level),
            )))),
  );

const filterCamerasByPrice = (
  cameras: TCamera[],
  [priceFrom, priceTo]: Partial<TFilterPriceRange>,
) => {
  if (!priceFrom && !priceTo) {
    return cameras;
  }

  return cameras.filter(
    (camera) =>
      (!priceFrom || camera.price >= priceFrom) &&
      (!priceTo || camera.price <= priceTo),
  );
};

const addProperty = (items: TCamera[]) => {
  return items.map((item) => {
    return {
      ...item,
      quantity: 0,
      isAdded: false,
    };
  });
};

const getCamerasByPagination = (items: TCamera[], page: number): TCamera[] => {
  const start = (page - 1) * CATALOG_SHOW;
  const end = page * CATALOG_SHOW;

  if (items.length === 0) {
    return items;
  }

  return items.slice(start, end);
};

export {
  formatDate,
  compareDate,
  compare,
  comparePrice,
  getMinMaxPrices,
  filterCameras,
  filterCamerasByPrice,
  addProperty,
  getCamerasByPagination,
};
