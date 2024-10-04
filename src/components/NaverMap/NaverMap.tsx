import {NaverMapView} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const NaverMap = () => {
  return <NaverMapView style={styles.map} />;
};

export default NaverMap;

const styles = StyleSheet.create({
  map: {height: heightPercentageToDP(100)},
});
