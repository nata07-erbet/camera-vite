import { useState } from 'react';
import { addToBasket } from '../store/action';
import { useAppDispatch } from '../hooks';

const useAddBasket = (cameraId: number) => {
  const [ added, setAdded ] = useState(false);
  const dispatch = useAppDispatch();

  dispatch(addToBasket({
    id: cameraId,
    status: !added
  }));
  setAdded((prevState) => !prevState);
};

export { useAddBasket }
