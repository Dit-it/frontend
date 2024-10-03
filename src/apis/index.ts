import axios, {AxiosRequestConfig} from 'axios';

const axiosConfig: AxiosRequestConfig = {
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

export const instance = axios.create(axiosConfig);
