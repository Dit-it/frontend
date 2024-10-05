import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView, ScrollView, TextInput, View,} from 'react-native';
import {RootStackParamList} from '../navigationTypes';
import CustomText from '@/components/Common/CustomText';
import HeaderLeftGoBack from '@/components/Common/HeaderLeftGoBack';
import {CustomButton} from '@/components/Common/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '@/styles/globalStyles';
import TrashListItem from '@/components/TrashList/TrashListItem';
import color from '@/constant/color';
import PhotoPickerModal from "@components/Common/PhotoPickerModal.tsx";
import {searchAndCleanModeStyles} from "@/styles/searchAndCleanModeStyles.tsx";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const CleanModeScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '청소모드',
      headerLeft: () => <HeaderLeftGoBack navigation={navigation} />,
    });
  }, [navigation]);

  const [searchImage, setSearchImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(searchImage);
  }, [searchImage]);

  return (
    <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
      <ScrollView style={globalStyles.commonContainer}>
        <View style={searchAndCleanModeStyles.wrapper}>
          <CustomText style={searchAndCleanModeStyles.title}>해안</CustomText>
          <View style={searchAndCleanModeStyles.textFlex}>
            <CustomText style={searchAndCleanModeStyles.textGray}>해안 선택하기</CustomText>
            <Icon
              size={18}
              name="chevron-forward-outline"
              color={color.gray400}
            />
          </View>
        </View>

        <View style={searchAndCleanModeStyles.wrapper}>
          <CustomText style={searchAndCleanModeStyles.title}>오염정도 평가</CustomText>
          <CustomButton style={[searchAndCleanModeStyles.gray, searchAndCleanModeStyles.flexRow]}
                        callBack={() => setModalVisible(true)}>
            <CustomText style={searchAndCleanModeStyles.imageButtonText}>사진등록</CustomText>
            <Icon size={20} name="add-circle" color={color.gray300} />
            <PhotoPickerModal modalVisible={modalVisible} setModalVisible={setModalVisible}
                              setSearchImage={setSearchImage}></PhotoPickerModal>
          </CustomButton>
        </View>

        <View style={searchAndCleanModeStyles.wrapper}>
          <CustomText style={searchAndCleanModeStyles.title}>위·경도</CustomText>
          <View style={searchAndCleanModeStyles.flex}>
            <View style={searchAndCleanModeStyles.inputPosition}>
              <CustomText style={searchAndCleanModeStyles.inputAbsoluteText}>위도</CustomText>
              <TextInput style={searchAndCleanModeStyles.input} autoCapitalize="none" />
            </View>
            <View style={searchAndCleanModeStyles.inputPosition}>
              <CustomText style={searchAndCleanModeStyles.inputAbsoluteText}>경도</CustomText>
              <TextInput style={searchAndCleanModeStyles.input} autoCapitalize="none" />
            </View>
          </View>
        </View>

        <View style={searchAndCleanModeStyles.wrapper}>
          <CustomText style={searchAndCleanModeStyles.title}>주요 쓰레기 - 총부피기준</CustomText>
          <TrashListItem />
        </View>
      </ScrollView>
      <CustomButton style={searchAndCleanModeStyles.confirmBtn}>
        <CustomText style={searchAndCleanModeStyles.buttonText}>입력 완료</CustomText>
      </CustomButton>
    </SafeAreaView>
  );
};

export default CleanModeScreen;
