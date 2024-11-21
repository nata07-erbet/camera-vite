import { AppRouteTab, SortTabInner, SortTabOrder, CategoryList, CamerasList, CamerasMap, LevelsList, LevelMap, PriceMap } from '../const/const';

type TCamera = {
  id: number;
  name: string;
  vendorCode: string;
  type: 'Коллекционная' | 'Моментальная' | 'Цифровая' | 'Плёночная';
  category: 'Видеокамера' | 'Фотоаппарат';
  description: string;
  level: 'Нулевой' | 'Любительский' | 'Профессиональный';
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
    camerasIds: [number];
    coupon?: string;
    tel: string;
  }

  type TSortType = (typeof SortTabInner)[keyof typeof SortTabInner];
  type TSortDirection = (typeof SortTabOrder)[keyof typeof SortTabOrder];


  type TCategory = (typeof CategoryList)[keyof typeof CategoryList];
  type TType = (typeof CamerasList)[keyof typeof CamerasList];
  type TLevel = (typeof LevelsList)[keyof typeof LevelsList];

  type TTypeValue = (typeof CamerasMap)[keyof typeof CamerasMap];
  type TTypeLevel = (typeof LevelMap)[keyof typeof LevelMap];

  type TFiltersData = {
    category: TCategory | null;
    types: TType[];
    levels: TLevel[];
  };

  type TPrice = (typeof PriceMap)[keyof typeof PriceMap];

  type TFormInputs = {
    priceFrom: number;
    priceUp: number;
  }

export type {
  TCamera,
  TPromo,
  TTab,
  TReview,
  TOrder,
  TSortType,
  TSortDirection,
  TCategory,
  TType,
  TTypeValue,
  TLevel,
  TTypeLevel,
  TFiltersData,
  TPrice,
  TFormInputs
};
