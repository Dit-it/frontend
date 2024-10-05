import {instance} from './index';

export const getMajorTypeOfLitter = async () => {
  const response = await instance.get(
    '/api/v1/cleanup/MajorTypeOfLitterGroupBySigungu/2023-09-01/2024-10-02',
  );
  return response.data;
};

export const getDownloadExcel = async () => {
  console.log('fldsfj');
  
  const response = await instance.get(
    '/api/v1/excel/download/cleanupEstimation/2023-09-01/2024-12-31',
  );
  console.log("response: ",response);
  
  return response.data;
};
