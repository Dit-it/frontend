import React from 'react';
import {ScrollView, TextInput, View} from "react-native";
import {globalStyles} from "@/styles/globalStyles.tsx";
import {searchAndCleanModeStyles} from "@/styles/searchAndCleanModeStyles.tsx";
import CustomText from "@components/Common/CustomText.tsx";
import {CustomButton} from "@components/Common/CustomButton.tsx";
import PictureBox from "@components/Common/PictureBox.tsx";

const AfterCleanupPage = ({
                              afterCleanupPicture,
                              setAfterCleanupPicture,
                              collectionPicture,
                              setCollectionPicture,
                              collectionLocationMemo,
                              setCollectionLocationMemo,
                              location,
                              cleanupDt
                          }: React.ComponentProps<any>) => {
    return (
        <>
            <ScrollView style={globalStyles.commonContainer}>
                <PictureBox picture={afterCleanupPicture} setPicture={setAfterCleanupPicture}
                            title={'청소 후 사진'}/>
                <View style={searchAndCleanModeStyles.wrapper}>
                    <CustomText style={searchAndCleanModeStyles.title}>청소 일시</CustomText>
                    <View style={searchAndCleanModeStyles.textFlex}>
                        <View style={searchAndCleanModeStyles.inputPosition}>
                            <CustomText style={searchAndCleanModeStyles.input}>
                                {cleanupDt && (`${cleanupDt.getFullYear()}${cleanupDt.getMonth() + 1}${cleanupDt.getDate()}${cleanupDt.getHours()}${cleanupDt.getMinutes()}`)}
                            </CustomText>
                        </View>
                    </View>
                </View>
                <PictureBox picture={collectionPicture} setPicture={setCollectionPicture}
                            title={'집하장소 사진'}/>
                <View style={searchAndCleanModeStyles.wrapper}>
                    <CustomText style={searchAndCleanModeStyles.title}>위·경도</CustomText>
                    <View style={searchAndCleanModeStyles.flex}>
                        <View style={searchAndCleanModeStyles.inputPosition}>
                            <CustomText style={searchAndCleanModeStyles.inputAbsoluteText}>위도</CustomText>
                            <CustomText style={searchAndCleanModeStyles.input}>{location?.latitude}</CustomText>
                        </View>
                        <View style={searchAndCleanModeStyles.inputPosition}>
                            <CustomText style={searchAndCleanModeStyles.inputAbsoluteText}>경도</CustomText>
                            <CustomText style={searchAndCleanModeStyles.input}>{location?.longitude}</CustomText>
                        </View>
                    </View>
                </View>
                <View style={searchAndCleanModeStyles.inputPosition}>
                    <TextInput
                        style={searchAndCleanModeStyles.input}
                        placeholder="집하장소에 대한 부가설명을 적어주세요."
                        autoCapitalize="none"
                        value={collectionLocationMemo}
                        onChangeText={(inputText) => setCollectionLocationMemo(inputText)}
                    />
                </View>
            </ScrollView>
            <CustomButton style={searchAndCleanModeStyles.confirmBtn}>
                <CustomText style={searchAndCleanModeStyles.buttonText}>청소 완료</CustomText>
            </CustomButton>
        </>
    );
};

export default AfterCleanupPage;