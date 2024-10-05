import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Alert, Pressable, SafeAreaView, StyleSheet, View,} from 'react-native';
import {RootStackParamList} from '../navigationTypes';
import HeaderLeftGoBack from '@/components/Common/HeaderLeftGoBack';
import {globalStyles} from '@/styles/globalStyles';
import {Asset} from "react-native-image-picker";
import AfterCleanupPage from "@screens/CleanMode/AfterCleanupPage.tsx";
import BeforeCleanupPage from "@screens/CleanMode/BeforeCleanupPage.tsx";
import Icon from "react-native-vector-icons/Ionicons";
import {getDateString} from "@/services/dateUtils.ts";
import {postMultipartFormData} from "@/services/postMultipartFormData.ts";
import {getLocation} from "@/services/getLocation.ts";
import {useQuery} from "react-query";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface RouteParams {
    coastCode?: number | null;
    coastName?: string | null;
    coastlineLen?: string | null;
}

const CleanModeScreen = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    const [beforeCleanupPicture, setBeforeCleanupPicture] = useState<Asset | null>(null);
    const [afterCleanupPicture, setAfterCleanupPicture] = useState<Asset | null>(null);
    const [collectionPicture, setCollectionPicture] = useState<Asset | null>(null);
    const [afterCleanupPageVisible, setAfterCleanupPageVisible] = useState(false);
    const [litterTypeCode, setLitterTypeCode] = useState<string | null>(null);
    const [collectionLocationMemo, setCollectionLocationMemo] = useState<string | null>(null);
    const [cleanupDt, setCleanupDt] = useState<Date | null>(null);
    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [count50Liter, setCount50Liter] = useState<number | null>(null);
    const {data} = useQuery('observeDataId', async () => await (await fetch(`https://www.didit.store/api/v1/observe/isBeforeCleanup/${coastCode}`)).text());

    const route = useRoute();
    const {coastCode, coastName, coastlineLen} = route.params as RouteParams || {coastCode: null};

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '청소모드',
            headerLeft: () => !afterCleanupPageVisible ? <HeaderLeftGoBack navigation={navigation}/> :
                <Pressable onPress={() => setAfterCleanupPageVisible(false)} hitSlop={8}>
                    {({pressed}) => (
                        <View style={[styles.iconContainer, pressed && styles.pressed]}>
                            <Icon size={30} name="chevron-back" color="rgba(0,0,0,0.9)"/>
                        </View>
                    )}
                </Pressable>,
        });
    }, [navigation, afterCleanupPageVisible]);

    const showAfterCleanupPageHandler = async () => {
        setAfterCleanupPageVisible(true);
    };

    useEffect(() => {
        if (afterCleanupPicture) {
            setCleanupDt(new Date());
        }
    }, [afterCleanupPicture]);

    useEffect(() => {
        if (collectionPicture) {
            // 위치정보 가져오기
            getLocation(setLocation);
        }
    }, [collectionPicture]);

    // post cleanup data
    const postCleanupData = async () => {
        const formData = new FormData();
        console.log('aa:', data);
        formData.append('observedDataId', data);
        formData.append('beforeCleanupPicture', {
            uri: beforeCleanupPicture?.uri,
            type: beforeCleanupPicture?.type || 'image/jpeg',
            name: beforeCleanupPicture?.fileName || 'beforeCleanupPicture.jpg'
        });
        formData.append('afterCleanupPicture', {
            uri: afterCleanupPicture?.uri,
            type: afterCleanupPicture?.type || 'image/jpeg',
            name: afterCleanupPicture?.fileName || 'afterCleanupPicture.jpg'
        });
        if (cleanupDt) {
            formData.append('cleanupDt', getDateString(cleanupDt));
        }
        formData.append('litterTypeCode', litterTypeCode);
        formData.append('count50Liter', count50Liter);
        formData.append('collectionPicture', {
            uri: collectionPicture?.uri,
            type: collectionPicture?.type || 'image/jpeg',
            name: collectionPicture?.fileName || 'collectionPicture.jpg'
        });
        formData.append('collectionLocationMemo', collectionLocationMemo);
        formData.append('lon', location?.longitude);
        formData.append('lat', location?.latitude);

        postMultipartFormData(formData, 'api/v1/cleanup').then(
            response => {
                if (response) {
                    Alert.alert('등록에 성공했습니다.');
                    navigation.navigate('Login');
                }
            }
        );
    };

    return (
        <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
            {!afterCleanupPageVisible ?
                <BeforeCleanupPage navigation={navigation} beforeCleanupPicture={beforeCleanupPicture}
                                   setBeforeCleanupPicture={setBeforeCleanupPicture}
                                   litterTypeCode={litterTypeCode} setLitterTypeCode={setLitterTypeCode}
                                   showAfterCleanupModalHandler={showAfterCleanupPageHandler}
                coastCode={coastCode} coastName={coastName} coastlineLen={coastlineLen}/>
                : <AfterCleanupPage afterCleanupPicture={afterCleanupPicture}
                                    setAfterCleanupPicture={setAfterCleanupPicture}
                                    collectionPicture={collectionPicture}
                                    setCollectionPicture={setCollectionPicture}
                                    collectionLocationMemo={collectionLocationMemo}
                                    setCollectionLocationMemo={setCollectionLocationMemo}
                                    location={location} count50Liter={count50Liter} setCount50Liter={setCount50Liter}
                                    cleanupDt={cleanupDt} postCleanupData={postCleanupData}/>}
        </SafeAreaView>
    );
};

export default CleanModeScreen;

const styles = StyleSheet.create({
    iconContainer: {
        opacity: 1,
    },
    pressed: {
        opacity: 0.55,
    },
});