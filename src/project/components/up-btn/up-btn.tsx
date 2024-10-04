import { Link } from 'react-router-dom';

function UpBtn() {
  return (
    <Link className="up-btn" to="#">
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </Link>
  );
}

export { UpBtn };

