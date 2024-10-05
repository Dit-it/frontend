import {Alert, Platform} from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

export const showCameraModalHandler = async () => {
  const permissions =
    Platform.OS === 'ios'
      ? [
          PERMISSIONS.IOS.CAMERA, // iOS 카메라 권한
          PERMISSIONS.IOS.PHOTO_LIBRARY, // iOS 사진 라이브러리 권한
          PERMISSIONS.IOS.MEDIA_LIBRARY, // iOS 미디어 라이브러리 권한
        ]
      : [
          PERMISSIONS.ANDROID.CAMERA, // Android 카메라 권한
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, // Android 사진 라이브러리 권한
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, // Android 미디어 라이브러리 권한
        ];

  try {
    // 모든 권한 체크
    const results = await Promise.all(
      permissions.map(permission => check(permission)),
    );

    let allGranted = true;

    // 권한 체크 결과 확인
    for (const result of results) {
      if (result !== RESULTS.GRANTED) {
        allGranted = false;
        break;
      }
    }

    if (allGranted) {
      console.log('모든 권한이 허용되었습니다.');
      return true;
    } else {
      // 권한 요청
      for (const permission of permissions) {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          console.log(`${permission} 권한이 허용되었습니다.`);
        } else {
          Alert.alert(
            '권한 필요',
            `${permission} 권한이 필요합니다. 권한을 허용해 주세요.`,
            [
              {text: '취소', style: 'cancel'},
              {
                text: '설정으로 이동',
                onPress: () => {
                  openSettings().catch(() => {
                    console.warn('설정 화면을 여는 중 오류 발생');
                  });
                },
              },
            ],
          );
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    console.warn('권한 확인 중 오류 발생:', error);
    return false;
  }
};
