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

type TPromo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

type TTab = (typeof AppRouteTab)[keyof typeof AppRouteTab];

type TReview = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  }

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
};
