import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {RootStackParamList} from '../navigationTypes';
import CustomText from '@/components/Common/CustomText';
import HeaderLeftGoBack from '@/components/Common/HeaderLeftGoBack';
import {CustomButton} from '@/components/Common/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '@/styles/globalStyles';
import TrashListItem from '@/components/TrashList/TrashListItem';
import color from '@/constant/color';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import PhotoPickerModal from '@components/Common/PhotoPickerModal.tsx';
import {showCameraModalHandler} from '@/services/cameraPermission';
import {openSettings} from 'react-native-permissions';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const SearchModeScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '조사모드',
      headerLeft: () => <HeaderLeftGoBack navigation={navigation} />,
    });
  }, [navigation]);

  const [searchImage, setSearchImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(searchImage);
  }, [searchImage]);

  const showModalHandler = async () => {
    const result = await showCameraModalHandler();
    console.log('result: ', result);
    if (result) {
      setModalVisible(true);
    } else {
      console.error('권한 요청 실패');
    }
  };

  return (
    <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
      <ScrollView style={globalStyles.commonContainer}>
        <View style={styles.wrapper}>
          <CustomText style={styles.title}>해안</CustomText>
          <View style={styles.textFlex}>
            <CustomText style={styles.textGray}>해안 선택하기</CustomText>
            <Icon
              size={18}
              name="chevron-forward-outline"
              color={color.gray400}
            />
          </View>
        </View>

        <View style={styles.wrapper}>
          <CustomText style={styles.title}>오염정도 평가</CustomText>
          <CustomButton
            style={[styles.gray, styles.flexRow]}
            callBack={showModalHandler}>
            <CustomText style={styles.imageButtonText}>사진등록</CustomText>
            <Icon size={20} name="add-circle" color={color.gray300} />
            <PhotoPickerModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              setSearchImage={setSearchImage}></PhotoPickerModal>
          </CustomButton>
        </View>

        <View style={styles.wrapper}>
          <CustomText style={styles.title}>주요 쓰레기 - 총부피기준</CustomText>
          <TrashListItem />
        </View>
      </ScrollView>
      <CustomButton style={styles.confirmBtn}>
        <CustomText style={styles.buttonText}>입력 완료</CustomText>
      </CustomButton>
    </SafeAreaView>
  );
};

export default SearchModeScreen;

const styles = StyleSheet.create({
  textFlex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: widthPercentageToDP('4%'),
    fontWeight: 500,
  },
  imageButtonText: {
    color: color.gray500,
  },
  wrapper: {
    marginBottom: heightPercentageToDP('2.78%'),
  },
  title: {
    fontSize: heightPercentageToDP('2%'),
    fontWeight: 500,
    marginBottom: 12,
  },
  flex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputPosition: {
    position: 'relative',
    width: '49%',
  },
  input: {
    width: '100%',
    fontSize: heightPercentageToDP('1.8%'),
    // borderColor: color.gray200,
    // borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    paddingTop: 15,
    height: 60,
    backgroundColor: color.gray100,
  },
  inputAbsoluteText: {
    position: 'absolute',
    left: 10,
    top: 10,
    color: color.gray500,
    fontSize: heightPercentageToDP('1.4%'),
    zIndex: 1,
  },
  gray: {
    backgroundColor: color.gray100,
  },
  textGray: {
    color: color.gray500,
    paddingTop: 1,
  },
  confirmBtn: {
    position: 'absolute',
    bottom: 0,
    // paddingTop: 10,
    height: 70,
    borderRadius: 0,
  },
});
