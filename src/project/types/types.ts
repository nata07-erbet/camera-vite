import { AppRouteTab, SortTabInner, SortTabOrder, CategoryList, CamerasList, LevelsList, PriceMap } from '../const/const';

type TCamera = {
  id: number;
  name: string;
  vendorCode: string;
  type: TTypeValue;
  category: TCategoryValue;
  description: string;
  level: TLevelValue;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

type TBasket = TCamera & {
  quantity: number
}

type TPromo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

type TTab = (typeof AppRouteTab)[keyof typeof AppRouteTab];

type TReviewId = {
  id: string;
  createAt: string;
};

type TReviewPost = {
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  };

  type TReview = TReviewId & TReviewPost;

  type TOrder = {
    camerasIds: number[];
    coupon?: string;
    tel?: string;
  };
  type TSortType = (typeof SortTabInner)[keyof typeof SortTabInner];
  type TSortDirection = (typeof SortTabOrder)[keyof typeof SortTabOrder];
  type TSortKey = `${TSortType}-${TSortDirection}`;

  type TCategory = (typeof CategoryList)[keyof typeof CategoryList];
  type TType = (typeof CamerasList)[keyof typeof CamerasList];
  type TLevel = (typeof LevelsList)[keyof typeof LevelsList];

  type TCategoryValue = 'Видеокамера' | 'Фотоаппарат';
  type TTypeValue = 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';
  type TLevelValue = 'Нулевой' | 'Любительский' | 'Профессиональный';

  type TFiltersData = {
    category: TCategory | null;
    types: TType[];
    levels: TLevel[];
  };

  type TPrice = (typeof PriceMap)[keyof typeof PriceMap];

  type TFormInputs = {
    priceFrom: number;
    priceUp: number;
  };

  type TFilterPriceRange = [number, number];

  type TLocalStore = TCamera & {
    quantity: number;
    isPromo: boolean;
  };

  type TCouponValue = 'camera-333' | 'camera-444' |'camera-555';
  type TPromoCoupon = {
      coupon: string;
  };

export type {
  TCamera,
  TPromo,
  TTab,
  TReview,
  TOrder,
  TSortType,
  TSortDirection,
  TSortKey,
  TCategory,
  TType,
  TTypeValue,
  TLevel,
  TLevelValue,
  TFiltersData,
  TPrice,
  TFormInputs,
  TFilterPriceRange,
  TReviewPost,
  TLocalStore,
  TCouponValue,
  TPromoCoupon,
  TBasket
};
