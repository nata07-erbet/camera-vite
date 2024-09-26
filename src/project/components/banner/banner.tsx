import { TPromo } from '../../types/types';

type BannerProps = {
  camera: TPromo;
}

function Banner({ camera }:BannerProps) {
  return (
    <div className="banner">
      <picture>
        <source
          type="image/webp"
          srcSet={camera.previewImgWebp}
        />
        <img
          src={camera.previewImg}
          srcSet={camera.previewImg2x}
          width={1280}
          height={280}
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {camera.name}
        </span>
        <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
        </span>
        <a className="btn" href="#">
          Подробнее
        </a>
      </p>
    </div>
  );
}

export { Banner };

