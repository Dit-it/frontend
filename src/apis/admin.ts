import { Alert } from 'react-native';
import {instance} from './index';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';

export const getMajorTypeOfLitter = async (
  startDate: string,
  endDate: string,
) => {
  const response = await instance.get(
    `/api/v1/cleanup/MajorTypeOfLitterGroupBySigungu/${startDate}/${endDate}`,
  );
  return response.data;
};

export const getDownloadExcel = async () => {
  try {
    // 서버에서 바이너리 데이터를 받아옴
    const response = await instance.get(
      '/api/v1/excel/download/cleanupEstimation/2023-09-01/2024-12-31', {
        responseType: 'arraybuffer', // 바이너리 데이터를 받을 때 사용
      }
    );

    // Content-Disposition 헤더에서 파일명 추출
    const disposition = response.headers['content-disposition'];
    let filename = 'downloaded_excel.xlsx'; // 기본 파일 이름

    if (disposition && disposition.includes('filename=')) {
      const fileNameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (fileNameMatch && fileNameMatch[1]) {
        filename = fileNameMatch[1].replace(/['"]/g, '');
      }
    }

    // ArrayBuffer를 base64로 변환
    const base64Data = Buffer.from(response.data).toString('base64');

    // 파일 경로 설정 (예: Documents 디렉토리)
    const path = `${RNFS.DownloadDirectoryPath}/${filename}`;

    console.log('File path:', path);

    // 파일을 로컬에 저장
    await RNFS.writeFile(path, base64Data, 'base64');

    // 다운로드 완료 알림
    Alert.alert('Download complete', `The file has been downloaded as ${filename}.`);

    return response.data;

  } catch (error) {
    console.error('Download error:', error);
    Alert.alert('Download failed', 'An error occurred while downloading the file.');
  }
};
