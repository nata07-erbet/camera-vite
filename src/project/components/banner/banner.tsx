import { Link, generatePath } from 'react-router-dom';
import { TPromo } from '../../types/types';


type BannerProps = {
  camera: TPromo;
}

function Banner({ camera }:BannerProps) {
  const href = generatePath('/camera/:id', {
    id: (camera.id).toString(),
  });

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
      <p className="banner__info" data-testid ='banner-offer'>
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {camera.name}
        </span>
        <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
        </span>
        <Link
          className="btn"
          to={href}
        >
          Подробнее
        </Link>
      </p>
    </div>
  );
}

export { Banner };

