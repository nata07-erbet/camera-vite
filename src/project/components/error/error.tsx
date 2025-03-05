import { useAppSelector } from '../../hooks';
import './error.css';

function Error() {
  const error = useAppSelector((state) => state.error);

  return error ? <div className="error">{error}</div> : '';
}

export { Error };
