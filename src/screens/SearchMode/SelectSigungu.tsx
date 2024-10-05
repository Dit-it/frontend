import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {globalStyles} from '@/styles/globalStyles';
import color from "@/constant/color.ts";
import {heightPercentageToDP} from "react-native-responsive-screen";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@screens/navigationTypes.ts";
import CustomText from "@components/Common/CustomText.tsx";
import HeaderLeftGoBack from "@components/Common/HeaderLeftGoBack.tsx";
import {useNavigation} from "@react-navigation/native";
import NaverMap from '@/components/NaverMap/NaverMap';
import {parse} from "@babel/core";


type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;
type Coordinate = {
    latitude: number;
    longitude: number;
};

const SelectSigungu = () => {

    const [sigunguList, setSigunguList] = useState([]);
    const [coordinates, setCoordinates] =  useState<Coordinate[][]>([]);

    const navigation = useNavigation<RegisterScreenNavigationProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '지역 선택',
            headerLeft: () => <HeaderLeftGoBack navigation={navigation}/>,
        });
    }, [navigation]);

    const getSigunguData = async () => {
        try {

        console.log('getSigunguList');
        const data = await (await fetch('http://10.30.1.63:8080/api/v1/sigunguInfo')).json();
        setSigunguList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{
        getSigunguData().then();
    },[])

    useEffect(() => {
        if (sigunguList.length > 0) {
            let polygonArray = [];

            for (const sigungu of sigunguList) {
                let tempArray = [];
                let geometry = JSON.parse(sigungu.sigunguPolygon).coordinates;
                let flatArray = geometry.flat(Infinity);
                for (let i = 0; i < flatArray.length - 2; i+=2) {
                    tempArray.push({latitude: flatArray[i+1], longitude: flatArray[i]});

                }
                polygonArray.push(tempArray);
            }
            setCoordinates(polygonArray);
        }
    }, [sigunguList]);

    return (
        <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
            <View style={globalStyles.commonContainer}>
                <View style={styles.mapContainer}>
                    {coordinates.length > 0 && (
                        <NaverMap
                            polygon={coordinates}
                            mapType={'minMap'}
                        />
                    )}

                    {/* sigunguList가 존재하고 배열일 때 map 함수 사용 */}
                    {sigunguList.length > 0 ? (
                        sigunguList.map((item, index) => (
                            <CustomText key={index}>
                                {item.sigunguName}
                            </CustomText>
                        ))
                    ) : (
                        <CustomText>Loading...</CustomText> // 데이터가 없을 때 로딩 메시지 표시
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

export default SelectSigungu;

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
        width: '100%',
        backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapContainer: {
        flex: 1,
        width: '90%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: color.gray300,
        position: 'relative',
    },
    topSectionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        left: 20,
        zIndex: 20,
    },
    topSectionFlex: {flexDirection: 'row', alignItems: 'center', gap: 7},
    topSectionFlexColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 15,
    },
    dropdownContainer: {
        backgroundColor: 'white',
        width: '40%',
        borderRadius: 100,
    },
    dropdown: {
        height: 37,
        borderColor: color.gray300,
        borderWidth: 0.5,
        borderRadius: 100,
        paddingHorizontal: 12,
    },
    placeholderStyle: {
        fontSize: heightPercentageToDP('1.8%'),
    },
    selectedTextStyle: {
        fontSize: heightPercentageToDP('1.8%'),
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: heightPercentageToDP('1.8%'),
    },
    itemContainerStyle: {
        fontSize: heightPercentageToDP('1.8%'),
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 5,
        top: -4,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: heightPercentageToDP('1.1%'),
    },
    swiperContainer: {
        position: 'absolute',
        zIndex: 20,
        bottom: 20,
        backgroundColor: color.primary,
        // alignItems: 'flex-end',
        // justifyContent: 'flex-end',
        height: 200,
        // width: '70%',
    },
});
