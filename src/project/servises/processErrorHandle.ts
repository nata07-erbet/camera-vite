import { setError } from '../store/action';
import { clearError } from '../store/api-actions';
import { store } from '../store';

const processErrorHandle = (message: string) => {
  store.dispatch(setError(message));
  store.dispatch(clearError());
};

export {processErrorHandle};
