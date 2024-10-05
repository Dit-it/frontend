import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView, StyleSheet,} from 'react-native';
import {RootStackParamList} from '../navigationTypes';
import {globalStyles} from '@/styles/globalStyles';
import {NaverMapMarkerOverlay, NaverMapView} from "@mj-studio/react-native-naver-map";
import {heightPercentageToDP} from "react-native-responsive-screen";
import {getLocation} from "@/services/getLocation.ts";
import {useQuery} from "react-query";
import SelectedCleanupDataView from "@components/Common/SelectedCleanupDataView.tsx";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const DriverModeScreen = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [selectedCleanupData, setSelectedCleanupData] = useState<Set<any>>(new Set());

    useEffect(() => {
        getLocation(setLocation);
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '운전자 모드',
            // headerLeft: () => <HeaderLeftGoBack navigation={navigation}/>,
        });
    }, [navigation]);

    const fetchCleanupDataList = async () => {
        return await (await fetch('https://www.didit.store/api/v1/cleanup/uncollected')).json();
    };

    // 청소 미완료 상태인 청소 데이터들 불러오기
    const {data, isError, error, isLoading, refetch} = useQuery('cleanupDataList', () => fetchCleanupDataList());

    // Set에 값 추가하기
    const addSelectedValue = (value: any) => {
        setSelectedCleanupData((prevSet) => new Set(prevSet).add(value));  // 새 Set 생성 후 값 추가
    };

    // Set에서 값 삭제하기
    const removeSelectedValue = (value: any) => {
        setSelectedCleanupData((prevSet) => {
            const newSet = new Set(prevSet);
            newSet.delete(value);
            return newSet;
        });
    };

    return (
        <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
            <NaverMapView
                style={[styles.fullMap]}
                initialCamera={{
                    latitude: location?.latitude || 35.1796,
                    longitude: location?.longitude || 129.0756,
                    zoom: 16
                }}
                onCameraChanged={(e) => console.log(e.latitude)}
            >
                {data && data.map((item: any, index: number) => (
                    <NaverMapMarkerOverlay
                        key={item.cleanupDataId}
                        latitude={item.lat}
                        longitude={item.lon}
                        image={{httpUri: `https://www.didit.store/${item.collectionPicture.substring(4)}`}}
                        width={40}
                        height={40}
                        alpha={selectedCleanupData.has(item) ? 1 : 0.4}
                        onTap={() => {
                            if (selectedCleanupData.has(item)) {
                                removeSelectedValue(item);
                            } else {
                                addSelectedValue(item);
                            }
                        }}
                    />
                ))}
            </NaverMapView>
            {selectedCleanupData.size > 0 && <SelectedCleanupDataView selectedCleanupData={selectedCleanupData} navigation={navigation} />}
        </SafeAreaView>
    );
};

export default DriverModeScreen;

const styles = StyleSheet.create({
    minMap: {
        width: '100%',
        height: heightPercentageToDP(40)
    },
    fullMap: {height: heightPercentageToDP(100)},
});