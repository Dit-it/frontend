import {ISigunguData} from '@/@types/sigunguTypes';
import {instance} from './index';

export const getSigunguInfo = async (): Promise<ISigunguData[]> => {
  const response = await instance.get('/api/v1/sigunguInfo');
  return response.data;
};

export const getCoastListByCode = async (sigunguCode: string | undefined) => {
  if (sigunguCode) {
    const response = await instance.get(
      `/api/v1/coast/listBySigungu/${sigunguCode}`,
    );
    return response.data;
  } else {
    console.log('sigunguCode 없음');
  }
};
