// import axios, { AxiosError, AxiosResponse } from 'axios';
// import { StatusCodes } from 'http-status-codes';
import { BASE_URL, REQUEST_TIMEOUT } from '../const/const';
// import { getToken } from '../store/token';
// import { processErrorHandle } from '../servises/processErrorHandle';

// type TDetailMessage = {
//   type: string;
//   message: string;
// };

// const StatusCodeMap: Record<number, boolean> = {
//   [StatusCodes.BAD_REQUEST]: true,
//   [StatusCodes.UNAUTHORIZED]: true,
//   [StatusCodes.NOT_FOUND]: true,
// };

// const shouldDisplayError = (response: AxiosResponse) =>
//   !!StatusCodeMap[response.status];

// const createAPI = () => {
//   const api = axios.create({
//     baseURL: BASE_URL,
//     timeout: 6000,
//   });
//   api.interceptors.request.use((config) => {
//     const token = getToken();
//     if (token && config.headers) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   });

//   api.interceptors.response.use(
//     (response) => response,
//     (error: AxiosError<TDetailMessage>) => {
//       if (error.response && shouldDisplayError(error.response)) {
//         const detailMessage = error.response.data;
//         processErrorHandle(detailMessage.message);
//       }
//       throw error;
//     },
//   );
//   return api;
// };

// export { createAPI };
import axios from 'axios';

const createAPI = () => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

export { createAPI };
