import {instance} from './index';

export const test = async () => {
  const response = await instance.get('/test');
  return response.data;
};
