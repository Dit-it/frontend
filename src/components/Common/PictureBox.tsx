import React, {useState} from 'react';
import {searchAndCleanModeStyles} from "@/styles/searchAndCleanModeStyles.tsx";
import CustomText from "@components/Common/CustomText.tsx";
import {Image, StyleSheet, View} from "react-native";
import {CustomButton} from "@components/Common/CustomButton.tsx";
import Icon from "react-native-vector-icons/Ionicons";
import color from "@/constant/color.ts";
import PhotoPickerModal from "@components/Common/PhotoPickerModal.tsx";
import {showCameraModalHandler} from "@/services/cameraPermission.ts";

const PictureBox = ({title, picture, setPicture} : React.ComponentProps<any>) => {
    const [cameraModalVisible, setCameraModalVisible] = useState(false);
    const showPictureModalHandler = async () => {
        const result = await showCameraModalHandler();
        if (result) {
            setCameraModalVisible(true);
        } else {
            console.error('권한 요청 실패');
        }
    };
    return (
        <View style={searchAndCleanModeStyles.wrapper}>
            <CustomText style={searchAndCleanModeStyles.title}>{title}</CustomText>
            {picture &&
                <View style={styles.containerStyle}><Image style={styles.imageStyle}
                                                           source={{uri: picture.uri}}/></View>}
            <CustomButton style={[searchAndCleanModeStyles.gray, searchAndCleanModeStyles.flexRow]}
                          callBack={showPictureModalHandler}>
                <CustomText
                    style={searchAndCleanModeStyles.imageButtonText}>{picture ? '사진수정' : '사진등록'}</CustomText>
                <Icon size={20} name="add-circle" color={color.gray300}/>
                <PhotoPickerModal
                    modalVisible={cameraModalVisible}
                    setModalVisible={setCameraModalVisible}
                    setPicture={setPicture}></PhotoPickerModal>
            </CustomButton>
        </View>
    );
};

export default PictureBox;

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
    imageStyle: {
        width: 200,
        height: 200
    }
});