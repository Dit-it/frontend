import {ITestResponse} from '@/@types/testTypes';
import {test} from '@/apis/test';
import {useQuery} from 'react-query';

// 커스텀 훅 정의
export const useCCTVList = () => {
  // react query
  const {
    data: getTestData,
    isLoading: getTestLoading,
    isFetching: getTestFetching,
  } = useQuery<ITestResponse>([], () => test());

  return {
    getTestData,
    getTestLoading,
    getTestFetching,
  };
};
