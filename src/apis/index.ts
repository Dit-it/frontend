import axios, {AxiosRequestConfig} from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: `https://www.didit.store`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

export const instance = axios.create(axiosConfig);
