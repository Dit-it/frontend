import {instance} from './index';

export const test = async () => {
  const response = await instance.get(
    '/api/v1/observe/majorLitterByCoast/2023-10-01/2024-09-02',
  );
  return response.data;
};
