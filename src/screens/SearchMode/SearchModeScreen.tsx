import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, Image, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View,} from 'react-native';
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
import {showCameraModalHandler} from '@/services/cameraPermission';
import {postMultipartFormData} from "@/services/postMultipartFormData.ts";
import {getDateString} from "@/services/dateUtils.ts";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const SearchModeScreen = () => {
        const navigation = useNavigation<RegisterScreenNavigationProp>();

        useLayoutEffect(() => {
            navigation.setOptions({
                headerTitle: '조사모드',
                headerLeft: () => <HeaderLeftGoBack navigation={navigation}/>,
            });
        }, [navigation]);

        const [observedPicture, setObservedPicture] = useState<Asset | null>(null);
        const [modalVisible, setModalVisible] = useState<Boolean>(false);
        const [litterTypeCode, setLitterTypeCode] = useState<string | null>(null);
        const [observedDt, setObservedDt] = useState<Date | null>(null);
        const [estimationLiter, setEstimationLiter] = useState<number | null>(null);

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
            if (observedPicture) {
                setObservedDt(new Date());
            }
        }, [observedPicture]);

        // 숫자만 입력하게 필터링
        const handleChangeText = (text: string) => {
            // 숫자만 입력 가능하게 필터
            const numericText = text.replace(/[^0-9]/g, '');
            setEstimationLiter(+numericText);
        };

        // register observe data
        const registerObserveData = () => {
            // formData 생성
            const formData = new FormData();
            formData.append('observedPicture', {
                uri: observedPicture?.uri,
                type: observedPicture?.type || 'image/jpeg',
                name: observedPicture?.fileName || 'observedPicture.jpg'
            });
            formData.append('coastCode', 34);
            formData.append('litterTypeCode', litterTypeCode);
            if (observedDt) {
                formData.append('observedDt', getDateString(observedDt));
            }
            formData.append('estimationLiter', estimationLiter);

            postMultipartFormData(formData, 'api/v1/observe/register').then(
                response => {
                    if (response) {
                        Alert.alert('등록에 성공했습니다.');
                        navigation.navigate('Login');
                    }
                }
            );
        }
        return (
            <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
                <ScrollView style={globalStyles.commonContainer}>
                    <View style={searchAndCleanModeStyles.wrapper}>
                        <CustomText style={searchAndCleanModeStyles.title}>해안</CustomText>
                        <View style={searchAndCleanModeStyles.textFlex}>
                            <TouchableOpacity onPress={() => navigation.navigate('SelectSection')}
                                              style={searchAndCleanModeStyles.textFlex}>
                                <CustomText style={searchAndCleanModeStyles.textGray}>해안 선택하기</CustomText>
                                <Icon
                                    size={18}
                                    name="chevron-forward-outline"
                                    color={color.gray400}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={searchAndCleanModeStyles.wrapper}>
                        <CustomText style={searchAndCleanModeStyles.title}>조사 사진</CustomText>
                        {observedPicture && <View style={styles.containerStyle}><Image style={styles.observedImageStyle}
                                                                                       source={{uri: observedPicture.uri}}/></View>}
                        <CustomButton style={[searchAndCleanModeStyles.gray, searchAndCleanModeStyles.flexRow]}
                                      callBack={showModalHandler}>
                            <CustomText
                                style={searchAndCleanModeStyles.imageButtonText}>{observedPicture ? '사진수정' : '사진등록'}</CustomText>
                            <Icon size={20} name="add-circle" color={color.gray300}/>
                            <PhotoPickerModal modalVisible={modalVisible} setModalVisible={setModalVisible}
                                              setPicture={setObservedPicture}></PhotoPickerModal>
                        </CustomButton>
                    </View>

                    <View style={searchAndCleanModeStyles.wrapper}>
                        <CustomText style={searchAndCleanModeStyles.title}>조사 일시</CustomText>
                        <View style={searchAndCleanModeStyles.textFlex}>
                            <View style={searchAndCleanModeStyles.input}>
                                <CustomText>
                                    {observedDt && (`${observedDt.getFullYear()}${observedDt.getMonth() + 1}${observedDt.getDate()}${observedDt.getHours()}${observedDt.getMinutes()}`)}
                                </CustomText>
                            </View>
                        </View>
                    </View>

                    <View style={searchAndCleanModeStyles.wrapper}>
                        <CustomText style={searchAndCleanModeStyles.title}>주요 쓰레기 - 총부피기준</CustomText>
                        <TrashListItem litterTypeCode={litterTypeCode} setLitterTypeCode={setLitterTypeCode}/>
                    </View>

                    <View style={[searchAndCleanModeStyles.wrapper, searchAndCleanModeStyles.lastItem]}>
                        <CustomText style={searchAndCleanModeStyles.title}>쓰레기 총 부피(L)</CustomText>
                        <TextInput
                            style={searchAndCleanModeStyles.input}
                            value={estimationLiter?.toString()}
                            onChangeText={handleChangeText}
                        />
                    </View>

                </ScrollView>
                <CustomButton style={searchAndCleanModeStyles.confirmBtn} callBack={registerObserveData}>
                    <CustomText style={searchAndCleanModeStyles.buttonText}>입력 완료</CustomText>
                </CustomButton>
            </SafeAreaView>
        );
    }
;

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
    observedImageStyle: {
        width: 200,
        height: 200
    },
});