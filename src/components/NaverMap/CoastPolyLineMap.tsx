import {
    Coord,
    NaverMapPolylineOverlay,
    NaverMapView, NaverMapViewRef,
} from '@mj-studio/react-native-naver-map';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

// @ts-ignore
const CoastPolyLineMap = ({line, mapType = 'fullMap', selectedCoastIndex, setSelectedCoastIndex} ) => {
    const ref = useRef<NaverMapViewRef>(null);
    const [selectedPolyLineIndex, setSelectedPolyLineIndex] = useState(selectedCoastIndex);

    useEffect(() => {
        if(selectedPolyLineIndex != null)
            setSelectedCoastIndex(selectedPolyLineIndex);
    }, [selectedPolyLineIndex])

    useEffect(() => {
        if(selectedCoastIndex != null)
            setSelectedPolyLineIndex(selectedCoastIndex);
    }, [selectedCoastIndex])

    const handleMapClick = (e: Coord) => {
        // e에는 클릭된 위치의 latitude, longitude 값이 포함됨
        if (ref.current) {
            ref.current.animateCameraTo({
                latitude: e.latitude,
                longitude: e.longitude,
                zoom: 12,
                duration: 1000,
            });
        }
    };

    return <NaverMapView
        style={[mapType === 'minMap' ? styles.minMap : styles.fullMap]}
        initialCamera={{
            latitude: 35.1796,
            longitude: 129.0756,
            zoom: 9
        }}
        ref={ref}
        onTapMap={handleMapClick}
    >
        {line.map((p, polyLineIndex) => (
            <NaverMapPolylineOverlay
                key={polyLineIndex}
                width={3}
                color={selectedPolyLineIndex === polyLineIndex ? 'rgb(237,150,0)' : 'rgba(16, 77, 208, 1)'}
                coords={p}
                zIndex={9}
                onTap={() => {
                    setSelectedPolyLineIndex(polyLineIndex);
                }}
            />
        ))}
    </NaverMapView>
};

export default CoastPolyLineMap;

const styles = StyleSheet.create({
    minMap: {
        width: '100%',
        height: heightPercentageToDP(40)
    },
    fullMap: {height: heightPercentageToDP(100)},
});
