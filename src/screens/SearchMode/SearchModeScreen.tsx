import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View,} from 'react-native';
import {RootStackParamList} from '../navigationTypes';
import CustomText from '@/components/Common/CustomText';
import HeaderLeftGoBack from '@/components/Common/HeaderLeftGoBack';
import {CustomButton} from '@/components/Common/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {globalStyles} from '@/styles/globalStyles';
import TrashListItem from '@/components/TrashList/TrashListItem';
import color from '@/constant/color';
import PhotoPickerModal from "@components/Common/PhotoPickerModal.tsx";
import {Asset} from "react-native-image-picker";
import {searchAndCleanModeStyles} from "@/styles/searchAndCleanModeStyles.tsx";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const SearchModeScreen = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '조사모드',
            headerLeft: () => <HeaderLeftGoBack navigation={navigation}/>,
        });
    }, [navigation]);

    const [searchImage, setSearchImage] = useState<Asset | null>(null);
    const [modalVisible, setModalVisible] = useState<Boolean>(false);

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

                    {searchImage && <View style={styles.containerStyle}><Image style={styles.searchImageStyle}
                                                                               source={{uri: searchImage.uri}}/></View>}
                    <CustomButton style={[searchAndCleanModeStyles.gray, searchAndCleanModeStyles.flexRow]}
                                  callBack={showModalHandler}>
                        <CustomText style={searchAndCleanModeStyles.imageButtonText}>{searchImage ? '사진수정' : '사진등록'}</CustomText>
                        <Icon size={20} name="add-circle" color={color.gray300}/>
                        <PhotoPickerModal modalVisible={modalVisible} setModalVisible={setModalVisible}
                                          setSearchImage={setSearchImage}></PhotoPickerModal>
                    </CustomButton>
                </View>

                <View style={searchAndCleanModeStyles.wrapper}>
                    <CustomText style={searchAndCleanModeStyles.title}>주요 쓰레기 - 총부피기준</CustomText>
                    <TrashListItem/>
                </View>

            </ScrollView>
            <CustomButton style={searchAndCleanModeStyles.confirmBtn}>
                <CustomText style={searchAndCleanModeStyles.buttonText}>입력 완료</CustomText>
            </CustomButton>
        </SafeAreaView>
    );
};

export default SearchModeScreen;

const styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        height: 200,
        backgroundColor: color.gray100,
        borderRadius: 10,
        marginBottom: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchImageStyle: {
        width: 200,
        height: 200
    },
});