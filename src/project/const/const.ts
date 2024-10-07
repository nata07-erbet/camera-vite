import { TTab } from '../types/types';

const BASE_URL = 'https://camera-shop.accelerator.htmlacademy.pro/';
const ALL_STARS = 5;

const ReqRoutes = {
  Main: '/',
  Cameras: 'cameras',
  Similar: '/cameras/:cameraId/similar',
  Promo: '/promo',
  Reviews: '/cameras/cameraId/reviews',
  Orders: '/orders',
};

const AppRoutes = {
  Main: '/',
  Camera: '/camera/:id'
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

export { BASE_URL, ReqRoutes, AppRoutes, NavMap, ALL_STARS, TABS, AppRouteTab, TabsMap, DEFAULT_TAB};
