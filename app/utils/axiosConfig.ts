import axios from 'axios';

import {BASE_URL} from '../constants';

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});
