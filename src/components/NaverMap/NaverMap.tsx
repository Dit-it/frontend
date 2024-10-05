import {NaverMapPolygonOverlay, NaverMapView, Region} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

// @ts-ignore
const NaverMap = ( {polygon} ) => {

    console.log(polygon.length);

  return <NaverMapView
      style={styles.map}
      initialCamera={{
        latitude: 35.1796,
        longitude: 129.0756,
        zoom: 10
      }}
  >
      {polygon.map((item, index) => (
          <NaverMapPolygonOverlay
              key={index}
              outlineWidth={1}
              outlineColor={'#104DD0'}
              color={'rgba(16, 77, 208, 0.15)'}
              coords={item}
              zIndex={9}
          />
      ))}
  </NaverMapView>
};

export default NaverMap;

const styles = StyleSheet.create({
  map: {height: heightPercentageToDP(40)},
});
