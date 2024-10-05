import React, {ComponentProps, useEffect, useState} from 'react';
import {StyleSheet, View} from "react-native";
import CustomText from "@components/Common/CustomText.tsx";
import {CustomButton} from "@components/Common/CustomButton.tsx";
import color from "@/constant/color.ts";
import {heightPercentageToDP} from "react-native-responsive-screen";

const SelectedCleanupDataView = ({selectedCleanupData, navigation} : ComponentProps<any>) => {

    const [totalLitter, setTotalLitter] = useState<number>(0);

    const collectSelectedCleanupData = () => {
        // 선택된 수거물 데이터 수거
        let flag : boolean = true;
        for (const cleanupData of selectedCleanupData) {
            fetch(`https://www.didit.store/api/v1/cleanup/collect/${cleanupData.cleanupDataId}`)
                .then(res => res.json())
                .then(data => {
                    flag = flag && data;
                })
                .catch(err => {
                    console.log(err)
                });
        }
        if (flag) {
            navigation.navigate('Login');
        }
    }

    useEffect(() => {
        // 예상적재량 계산
        let sum = 0;
        for (const {totalCleanupLitter} of selectedCleanupData) {
            sum += totalCleanupLitter;
        }
        setTotalLitter(sum);
    }, [selectedCleanupData]);

    return (
        <View style={styles.seatItemWrapper}>
            <View style={styles.textContainer}>
                <View style={styles.textWrapper}>
                    <CustomText style={styles.mainTitle}>예상 수거량</CustomText>
                    <CustomText style={styles.subTitle}>{totalLitter}</CustomText>
                </View>
            </View>

            <CustomButton callBack={() => {collectSelectedCleanupData()}}>
                <CustomText style={{color: 'white'}}>선택 지점 수거 완료하기</CustomText>
            </CustomButton>
        </View>
    );
};

export default SelectedCleanupDataView;

const styles = StyleSheet.create({
    seatItemWrapper: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        paddingVertical:30,
        paddingHorizontal:30,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 40,
        shadowColor: '#666666',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 3,
        shadowRadius: 10,
        elevation: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    textWrapper: {
        flexDirection: 'row',
    },
    textContainer: {
        flexDirection: 'column',
        gap: 15,
    },
    mainTitle: {
        color: color.gray500,
        fontSize: heightPercentageToDP('1.8%'),
        width: '30%',
    },
    subTitle: {
        fontSize: heightPercentageToDP('1.8%'),
        flex: 1,
        color: color.black,
        fontWeight: 700,
    },
});