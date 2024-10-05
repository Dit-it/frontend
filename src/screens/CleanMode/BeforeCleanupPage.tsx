import React, {useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from "react-native";
import {globalStyles} from "@/styles/globalStyles.tsx";
import {searchAndCleanModeStyles} from "@/styles/searchAndCleanModeStyles.tsx";
import CustomText from "@components/Common/CustomText.tsx";
import Icon from "react-native-vector-icons/Ionicons";
import color from "@/constant/color.ts";
import {CustomButton} from "@components/Common/CustomButton.tsx";
import PhotoPickerModal from "@components/Common/PhotoPickerModal.tsx";
import TrashListItem from "@components/TrashList/TrashListItem.tsx";
import {showCameraModalHandler} from "@/services/cameraPermission.ts";
import PictureBox from "@components/Common/PictureBox.tsx";

const BeforeCleanupPage = ({
                               navigation,
                               beforeCleanupPicture, setBeforeCleanupPicture, litterTypeCode, setLitterTypeCode,
                               showAfterCleanupModalHandler
                           }: React.ComponentProps<any>) => {
    return (
        <>
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

                <PictureBox picture={beforeCleanupPicture} setPicture={setBeforeCleanupPicture}
                            title={'청소 전 사진'}/>

                <View style={[searchAndCleanModeStyles.wrapper, searchAndCleanModeStyles.lastItem]}>
                    <CustomText style={searchAndCleanModeStyles.title}>주요 쓰레기 - 총부피기준</CustomText>
                    <TrashListItem litterTypeCode={litterTypeCode} setLitterTypeCode={setLitterTypeCode}/>
                </View>
            </ScrollView>
            <CustomButton style={searchAndCleanModeStyles.confirmBtn} callBack={showAfterCleanupModalHandler}>
                <CustomText style={searchAndCleanModeStyles.buttonText}>청소 시작</CustomText>
            </CustomButton>
        </>
    );
};

export default BeforeCleanupPage;

