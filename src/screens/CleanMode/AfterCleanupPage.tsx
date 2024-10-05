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
                              location, count50Liter,
                              cleanupDt, setCount50Liter, postCleanupData
                          }: React.ComponentProps<any>) => {
    // 숫자만 입력하게 필터링
    const handleChangeText = (text: string) => {
        // 숫자만 입력 가능하게 필터
        const numericText = text.replace(/[^0-9]/g, '');
        setCount50Liter(+numericText);
    };

    return (
        <>
            <ScrollView style={globalStyles.commonContainer}>
                <PictureBox picture={afterCleanupPicture} setPicture={setAfterCleanupPicture}
                            title={'청소 후 사진'}/>
                <View style={searchAndCleanModeStyles.wrapper}>
                    <CustomText style={searchAndCleanModeStyles.title}>청소 일시</CustomText>
                    <View style={searchAndCleanModeStyles.textFlex}>
                        <View style={searchAndCleanModeStyles.input}>
                            <CustomText>
                                {cleanupDt && (`${cleanupDt.getFullYear()}${cleanupDt.getMonth() + 1}${cleanupDt.getDate()}${cleanupDt.getHours()}${cleanupDt.getMinutes()}`)}
                            </CustomText>
                        </View>
                    </View>
                </View>
                <View style={searchAndCleanModeStyles.wrapper}>
                    <CustomText style={searchAndCleanModeStyles.title}>50L 쓰레기 포대 수(개)</CustomText>
                    <TextInput
                        style={searchAndCleanModeStyles.input}
                        value={count50Liter?.toString()}
                        onChangeText={handleChangeText}
                    />
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
                <View style={searchAndCleanModeStyles.flex} >
                    <TextInput
                        style={[searchAndCleanModeStyles.input, searchAndCleanModeStyles.lastItem]}
                        placeholder="집하장소에 대한 부가설명을 적어주세요."
                        autoCapitalize="none"
                        value={collectionLocationMemo}
                        onChangeText={(inputText) => setCollectionLocationMemo(inputText)}
                    />
                </View>
            </ScrollView>
            <CustomButton style={searchAndCleanModeStyles.confirmBtn} callBack={() => postCleanupData()}>
                <CustomText style={searchAndCleanModeStyles.buttonText}>청소 완료</CustomText>
            </CustomButton>
        </>
    );
};

export default AfterCleanupPage;