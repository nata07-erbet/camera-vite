import { AppRouteTab, SortTabInner, SortTabOrder } from '../const/const';

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

  type TSortInner = (typeof SortTabInner)[keyof typeof SortTabInner];
  type TSortOrder = (typeof SortTabOrder)[keyof typeof SortTabOrder];

export type { TCamera, TPromo, TTab, TReview, TOrder, TSortInner, TSortOrder };
