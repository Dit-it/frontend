import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Pressable, SafeAreaView, StyleSheet, View,} from 'react-native';
import {RootStackParamList} from '../navigationTypes';
import HeaderLeftGoBack from '@/components/Common/HeaderLeftGoBack';
import {globalStyles} from '@/styles/globalStyles';
import {Asset} from "react-native-image-picker";
import AfterCleanupPage from "@screens/CleanMode/AfterCleanupPage.tsx";
import BeforeCleanupPage from "@screens/CleanMode/BeforeCleanupPage.tsx";
import Icon from "react-native-vector-icons/Ionicons";
import Geolocation from '@react-native-community/geolocation';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

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

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                console.log('accuracy ', accuracy);
                setLocation({ latitude, longitude });
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

    useEffect(() => {
        if (collectionPicture) {
            // 위치정보 가져오기
            getLocation();
        }
    }, [collectionPicture]);

    return (
        <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
            {!afterCleanupPageVisible ?
                <BeforeCleanupPage navigation={navigation} beforeCleanupPicture={beforeCleanupPicture}
                                   setBeforeCleanupPicture={setBeforeCleanupPicture}
                                   litterTypeCode={litterTypeCode} setLitterTypeCode={setLitterTypeCode}
                                   showAfterCleanupModalHandler={showAfterCleanupPageHandler}/>
                : <AfterCleanupPage afterCleanupPicture={afterCleanupPicture}
                                    setAfterCleanupPicture={setAfterCleanupPicture}
                                    collectionPicture={collectionPicture}
                                    setCollectionPicture={setCollectionPicture}
                                    collectionLocationMemo={collectionLocationMemo}
                                    setCollectionLocationMemo={setCollectionLocationMemo}
                                    location={location}
                                    cleanupDt={cleanupDt}/>}
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