import { TTab, TSortType, TSortDirection, TCategory, TType, TLevel, TPrice, TFiltersData } from '../types/types';

const BASE_URL = 'https://camera-shop.accelerator.htmlacademy.pro/';
const ALL_STARS = 5;
const REVIEW_SHOW = 3;
const CATALOG_SHOW = 9;
const BASKET_AMOUNT = 9;

const INITIAL_PAGE_BY_PAGINATION = 1;
const MAX_PAGES_IN_RANGE = 3;

const MIN_CAMERA = 1;
const MAX_CAMERA = 9;

const DATE_FORMAT = 'DD MMMM';
const KEY_LOCAL_STORAGE_OFFERS = 'my_basket';

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
  Basket: '/card'
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

const SORT_INNER: TSortType[] = ['price', 'popular'];
const DEFAULT_SORT_TYPE = SortTabInner.Price;

const SortTabOrder = {
  Up: 'up',
  Down: 'down',
} as const;

const SortOrderMap = {
  [SortTabOrder.Up]: 'По возрастанию',
  [SortTabOrder.Down]: 'По убыванию'
} as const;

const DEFAULT_SORT_DIRECTION = SortTabOrder.Up;
const SORT_ORDER: TSortDirection[] = ['up', 'down'];

const INITIAL_FILTERS: TFiltersData = {
  category: null,
  types: [],
  levels: [],
};

const CATEGORIES: TCategory[] = ['photocamera', 'videocamera'];

const CategoryList = {
  Photocamera: 'photocamera',
  Videocamera: 'videocamera',
} as const;

const CategoryMap = {
  [CategoryList.Photocamera]: 'Фотоаппарат',
  [CategoryList.Videocamera]: 'Видеокамера'
} as const;

const DEFAULT_CATEGORY = CategoryList.Photocamera;

const CAMERAS: TType[] = ['digital', 'film', 'snapshot', 'collection'];

const CamerasList = {
  Digital: 'digital',
  Film: 'film',
  Snapshot: 'snapshot',
  Collection: 'collection',
} as const;

const CamerasMap = {
  [CamerasList.Digital]: 'Цифровая',
  [CamerasList.Film]: 'Плёночная',
  [CamerasList.Snapshot]: 'Моментальная',
  [CamerasList.Collection]: 'Коллекционная',
} as const;

const LEVELS: TLevel[] = ['zero','non-professional','professional'];

const LevelsList = {
  Zero: 'zero',
  NonProfessional: 'non-professional',
  Professional: 'professional'
} as const;

const LevelMap: Record<TLevel, string> = {
  [LevelsList.Zero]: 'Нулевой',
  [LevelsList.NonProfessional]: 'Любительский',
  [LevelsList.Professional]: 'Профессиональный',
} as const;

const PriceList = {
  Price: 'price',
  PriceUp: 'priceUp'
} as const;

const PriceMap = {
  [PriceList.Price]: 'от',
  [PriceList.PriceUp]: 'до'
} as const;

const RequestStatus = {
  Idle: 'Idle',
  Pending: 'Pending',
  Error: 'Error',
  Success: 'Success'
} as const;

const RateBarMap = {
  1: 'Отлично',
  2: 'Хорошо',
  3: 'Нормально',
  4: 'Плохо',
  5: 'Ужасно',
};

const SettingValidation = {
  UserMessageRateRequired: 'Rate number is required',
  UserMessageRateValidation: 'Rate must contain from 1 to 5 stars',
  UserNameMessageRequired: 'UserName is required',
  UserNameMessageValidation: 'UserName must contain from 2 to 15 letters',
  UserPlusMessageRequired: 'Advantage is required',
  UserPlusMessageValidation: 'Advantage must contain from 10 to 160 letters',
  UserMinusMessageRequired: 'Disadvantage is required',
  UserMinusMessageValidation: 'Disadvantage must contain from 10 to 160 letters',
  UserCommentMessageRequired: 'Comment is required',
  UserCommentMessageValidation: 'Comment must contain from 10 to 160 letters',
};

const PRICES: TPrice[] = ['от', 'до'];

const DiscountMap = {
  firstLevel: 3,
  secondLevel: 5,
  thirdLevel: 10,
  fourthLevel: 15
};

const QuantityMap = {
  firstStep: 2,
  secondStepStart: 3,
  secondStepEnd: 5,
  thirdStepStart: 6,
  thirdStepEnd: 10,
  fourthStep: 10
};

const SummaryMap = {
  firstStage: 10000,
  secondStage: 20000,
  thirdStage: 30000,
};

const DiscountSummaryMap = {
  second: 1,
  third : 2,
  fourth: 3,
};


const PaginationButton = {
  Prev: 'Назад',
  Next: 'Далее',
};


export enum NameSpace {
  Cameras = 'CAMERAS',
  Camera = 'CAMERA',
  Similar = 'SIMILAR',
  Promo = 'PROMO',
  Reviews = 'REVIEWS',
  Coupon = 'COUPON',
  ToBasket = 'TO_BASKET',
  FromBasket = 'FROM_BASKET',
  Order = 'ORDER'
};


export { BASE_URL, ReqRoutes, AppRoutes, NavMap, ALL_STARS, TABS, AppRouteTab, TabsMap, DEFAULT_TAB, DATE_FORMAT, REVIEW_SHOW, CATALOG_SHOW, MAX_PAGES_IN_RANGE, INITIAL_PAGE_BY_PAGINATION, SortTabInner, SortInnerMap, SORT_INNER, DEFAULT_SORT_TYPE, SortTabOrder, SORT_ORDER, SortOrderMap, DEFAULT_SORT_DIRECTION, CATEGORIES, CategoryList, CategoryMap, DEFAULT_CATEGORY, CAMERAS, CamerasMap, CamerasList, LEVELS, LevelsList, LevelMap, INITIAL_FILTERS, PriceList, PriceMap, PRICES, BASKET_AMOUNT, MIN_CAMERA, MAX_CAMERA, KEY_LOCAL_STORAGE_OFFERS, RequestStatus, RateBarMap, SettingValidation, DiscountMap, QuantityMap, SummaryMap, DiscountSummaryMap, PaginationButton };
