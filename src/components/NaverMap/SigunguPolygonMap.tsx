import {Coord, NaverMapPolygonOverlay, NaverMapView, Region} from '@mj-studio/react-native-naver-map';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

// @ts-ignore
const SigunguPolygonMap = ({polygon, regionList,
                       mapType = 'fullMap', selectedRegionIndex, setSelectedRegionIndex} ) => {

    const [selectedPolygonIndex, setSelectedPolygonIndex] = useState(selectedRegionIndex);

    useEffect(() => {
        if(selectedPolygonIndex != null)
        setSelectedRegionIndex(selectedPolygonIndex);
    }, [selectedPolygonIndex])

    useEffect(() => {
        if(selectedRegionIndex != null)
            setSelectedPolygonIndex(selectedRegionIndex);
    }, [selectedRegionIndex])


    return <NaverMapView
      style={[mapType === 'minMap' ? styles.minMap : styles.fullMap]}
      initialCamera={{
        latitude: 35.1796,
        longitude: 129.0756,
        zoom: 9
      }}>
        {polygon.map((p, polygonIndex) => (
            <NaverMapPolygonOverlay
                key={polygonIndex}
                outlineWidth={1}
                outlineColor={'#104DD0'}
                color={selectedPolygonIndex === polygonIndex ? 'rgba(16, 77, 208, 0.5)' : 'rgba(16, 77, 208,0.01)'}
                coords={p}
                zIndex={9}
                onTap={() => {
                    setSelectedPolygonIndex(polygonIndex);
                }}
            />
        ))}
  </NaverMapView>
};

export default SigunguPolygonMap;

const styles = StyleSheet.create({
  minMap: {
      width: '100%',
      height: heightPercentageToDP(40)
  },
  fullMap: {height: heightPercentageToDP(100)},
});
