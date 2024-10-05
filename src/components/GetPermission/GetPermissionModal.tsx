import React from 'react';
import {Alert, Image, Platform, StyleSheet, View} from 'react-native';
import {CustomButton} from '../Common/CustomButton';
import CustomText from '../Common/CustomText';
import {
  openSettings,
  PERMISSIONS,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import color from '@/constant/color';

interface GetPermissionModalProps {
  onHide: () => void;
}

const GetPermissionModal = ({onHide}: GetPermissionModalProps) => {
  const requestAllPermissions = async () => {
    const permissions =
      Platform.OS === 'ios'
        ? [
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, // 위치 권한 (iOS)
            PERMISSIONS.IOS.CAMERA, // 카메라 권한 (iOS)
            PERMISSIONS.IOS.PHOTO_LIBRARY, // 사진 라이브러리 권한 (iOS)
            PERMISSIONS.IOS.MEDIA_LIBRARY, // 미디어 라이브러리 권한 (iOS)
          ]
        : [
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, // 위치 권한 (Android)
            PERMISSIONS.ANDROID.CAMERA, // 카메라 권한 (Android)
          ];

    try {
      const result = await requestMultiple(permissions);
      (Object.keys(result) as Array<keyof typeof result>).forEach(
        permission => {
          if (
            result[permission] === RESULTS.DENIED ||
            result[permission] === RESULTS.BLOCKED
          ) {
            Alert.alert(
              '권한 필요',
              `${permission} 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.`,
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
          }
        },
      );

      // 모든 권한 요청 완료 후 모달을 닫기
      onHide();
    } catch (error) {
      console.warn('권한 요청 중 오류 발생:', error);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.viewContainer}>
        <CustomText style={styles.mainTitle}>앱 권한 설정 안내</CustomText>
        <CustomText style={styles.subTitle}>
          바다환경지킴이 앱을 이용하기 위해서는 다음의 접근 권한을 요청할 수
          있습니다.
        </CustomText>
        <View style={styles.infoContainer}>
          <View style={styles.viewWrapper}>
            <Image source={require('@assets/icon/dummy_icon.png')} />
            <View style={styles.textWrapper}>
              <View style={styles.viewWrapper}>
                <CustomText style={styles.textTitle}>위치</CustomText>
                <CustomText style={styles.strong}>(필수)</CustomText>
              </View>
              <CustomText style={styles.subText}>
                위치 경도 좌표 확인
              </CustomText>
            </View>
          </View>

          <View style={styles.viewWrapper}>
            <Image source={require('@assets/icon/dummy_icon.png')} />
            <View style={styles.textWrapper}>
              <View style={styles.viewWrapper}>
                <CustomText style={styles.textTitle}>카메라</CustomText>
                <CustomText style={styles.strong}>(필수)</CustomText>
              </View>
              <CustomText style={styles.subText}>
                전경 및 쓰레기 수거 시 사진촬영 및 가져오기
              </CustomText>
            </View>
          </View>

          <View style={styles.viewWrapper}>
            <Image source={require('@assets/icon/dummy_icon.png')} />
            <View style={styles.textWrapper}>
              <View style={styles.viewWrapper}>
                <CustomText style={styles.textTitle}>저장소</CustomText>
                <CustomText style={styles.strong}>(필수)</CustomText>
              </View>
              <CustomText style={styles.subText}>
                파일 및 미디어 저장 및 불러오기
              </CustomText>
            </View>
          </View>
        </View>
        <CustomButton callBack={requestAllPermissions} style={styles.button}>
          <CustomText style={styles.textWhite}>권한 요청</CustomText>
        </CustomButton>
      </View>
      <View style={styles.backgroundBg}></View>
    </View>
  );
};

export default GetPermissionModal;

const styles = StyleSheet.create({
  mainTitle: {
    color: color.black,
    fontWeight: 800,
    fontSize: heightPercentageToDP('2%'),
  },
  subTitle: {
    textAlign: 'center',
    color: color.black,
    fontSize: heightPercentageToDP('1.4%'),
    marginTop: 10,
    marginBottom: 20,
    width: '90%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    position: 'absolute',
  },
  infoContainer: {flexDirection: 'column', gap: 15},
  viewContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    paddingHorizontal: 15,
    paddingVertical: 20,
    zIndex: 2,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  textWhite: {
    color: 'white',
  },
  backgroundBg: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.55)',
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    zIndex: 1,
  },
  viewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    flexDirection: 'column',
    marginLeft: 7,
  },
  subText: {
    color: color.gray400,
    fontSize: heightPercentageToDP('1.4%'),
    marginTop: 3,
  },
  button: {
    width: '100%',
    borderRadius: 100,
    marginTop: 30,
  },
  textTitle: {
    fontWeight: 600,
    color: color.black,
  },
  strong: {
    color: color.red,
    fontWeight: 600,
    marginLeft: 3,
  },
});
