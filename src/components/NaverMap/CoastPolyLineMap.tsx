import {
    NaverMapPolylineOverlay,
    NaverMapView,
} from '@mj-studio/react-native-naver-map';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

// @ts-ignore
const CoastPolyLineMap = ({line, mapType = 'fullMap', selectedCoastIndex, setSelectedCoastIndex} ) => {

    const [selectedPolyLineIndex, setSelectedPolyLineIndex] = useState(selectedCoastIndex);

    useEffect(() => {
        if(selectedPolyLineIndex != null)
            setSelectedCoastIndex(selectedPolyLineIndex);
    }, [selectedPolyLineIndex])

    useEffect(() => {
        if(selectedCoastIndex != null)
            setSelectedPolyLineIndex(selectedCoastIndex);
    }, [selectedCoastIndex])

    return <NaverMapView
        style={[mapType === 'minMap' ? styles.minMap : styles.fullMap]}
        initialCamera={{
            latitude: 35.1796,
            longitude: 129.0756,
            zoom: 9
        }}
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
