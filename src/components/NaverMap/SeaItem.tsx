import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomText from '../Common/CustomText';
import {CustomButton} from '../Common/CustomButton';
import color from '@/constant/color';

export interface SeaItemProps {
  location: string;
  seaName: string;
  seaLength: string;
}

const SeaItem = ({location, seaName, seaLength}: SeaItemProps) => {
  return (
    <View style={styles.seatItemWrapper}>
      <View>
        <CustomText>행정구역</CustomText>
        <CustomText>{location}</CustomText>
      </View>
      <View>
        <CustomText>해안명</CustomText>
        <CustomText>{seaName}</CustomText>
      </View>
      <View>
        <CustomText>해안길이</CustomText>
        <CustomText>{seaLength}km</CustomText>
      </View>

      <CustomButton>
        <CustomText>선택하기</CustomText>
      </CustomButton>
    </View>
  );
};

export default SeaItem;

const styles = StyleSheet.create({
  seatItemWrapper: {
    // position: 'absolute',
    // zIndex: 20,
    // width: '100%',
    // height: 200,
    // backgroundColor: color.gray500,
  },
});
