import { TTab, TSortInner, TSortOrder } from '../types/types';

const BASE_URL = 'https://camera-shop.accelerator.htmlacademy.pro/';
const ALL_STARS = 5;
const REVIEW_SHOW = 3;
const CATALOG_SHOW = 9;

const DATE_FORMAT = 'DD MMMM';

const ReqRoutes = {
  Main: '/',
  Cameras: 'cameras',
  Similar: 'similar',
  Promo: '/promo',
  Reviews: 'reviews',
  Orders: '/orders',
};

const AppRoutes = {
  Main: '/',
  Camera: '/camera/:id',
  Basket: '/basket'
};

const NavMap = {
  Catalog: 'Каталог',
  Order: 'Гарантии',
  Delivery: 'Доставка',
  About: 'O компании'
} as const;

const AppRouteTab = {
  Characteristic: 'characteristic',
  Description: 'description'
} as const;

const TabsMap = {
  [AppRouteTab.Characteristic]: 'Характеристики',
  [AppRouteTab.Description]: 'Описание'
} as const;

const TABS: TTab[] = ['characteristic', 'description'];
const DEFAULT_TAB = AppRouteTab.Description;

const SortTabInner = {
  Price: 'price',
  Popular: 'popular'
} as const;

const SortInnerMap = {
  [SortTabInner.Price]: 'по цене',
  [SortTabInner.Popular]: 'по популярности',
} as const ;

const SORT_INNER: TSortInner[] = ['price', 'popular'];
const DEFAULT_TAB_SORT = SortTabInner.Price;

const SortTabOrder = {
  Up: 'up',
  Down: 'down',
} as const;

const SortOrderMap = {
  [SortTabOrder.Up]: 'По возрастанию',
  [SortTabOrder.Down]: 'По убыванию'
} as const;

const DEFAULT_TAB_SORT_ORDER = SortTabOrder.Up;
const SORT_ORDER: TSortOrder[] = ['up', 'down'];


export { BASE_URL, ReqRoutes, AppRoutes, NavMap, ALL_STARS, TABS, AppRouteTab, TabsMap, DEFAULT_TAB, DATE_FORMAT, REVIEW_SHOW, CATALOG_SHOW, SortTabInner, SortInnerMap, SORT_INNER, DEFAULT_TAB_SORT, SortTabOrder, SORT_ORDER, SortOrderMap, DEFAULT_TAB_SORT_ORDER };
