import axios from 'axios';
import { BASE_URL } from '../const/const';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 6000
});

export { api };
