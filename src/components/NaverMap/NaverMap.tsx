import {Coord, NaverMapPolygonOverlay, NaverMapView, Region} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {log} from "react-native-reanimated-carousel/lib/typescript/utils/log";

// @ts-ignore
const NaverMap = ({polygon, mapType = 'fullMap'}) => {

    return <NaverMapView
        style={[mapType === 'minMap' ? styles.minMap : styles.fullMap]}
        initialCamera={{
            latitude: 35.1796,
            longitude: 129.0756,
            zoom: 10
        }}
    >
        {polygon.map((p: Coord[], polygonIndex: React.Key | null | undefined) => (
          <NaverMapPolygonOverlay
              key={polygonIndex}
              outlineWidth={1}
              outlineColor={'#104DD0'}
              color={'rgba(16, 77, 208, 0.15)'}
              coords={p}
              zIndex={9}
          />
      ))}
  </NaverMapView>
};

export default NaverMap;

const styles = StyleSheet.create({
  minMap: {height: heightPercentageToDP(40)},
  fullMap: {height: heightPercentageToDP(100)},
});
