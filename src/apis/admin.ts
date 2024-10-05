import {instance} from './index';

export const getMajorTypeOfLitter = async () => {
  const response = await instance.get(
    '/api/v1/cleanup/MajorTypeOfLitterGroupBySigungu/2023-09-01/2024-10-02',
  );
  return response.data;
};
