import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { ReqRoutes } from '../const/const';
import { TCamera } from '../types/types';

const [ cameras, setCameras ] = useState<TCamera[]>([]);

const useGetOffers = useEffect(() => {
  api
    .get<TCamera[]>(ReqRoutes.Cameras)
    .then((response) => setCameras(response.data))
}, [cameras]);

export { useGetOffers };
