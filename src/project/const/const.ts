const BASE_URL = 'https://camera-shop.accelerator.htmlacademy.pro/';

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
  Camera: 'camera/:id'
};

const NavMap = {
  Catalog: 'Каталог',
  Order: 'Гарантии',
  Delivery: 'Доставка',
  About: 'O компании'
} as const;

export { BASE_URL, ReqRoutes, AppRoutes, NavMap};
