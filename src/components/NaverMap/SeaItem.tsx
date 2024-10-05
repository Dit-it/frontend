import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomText from '../Common/CustomText';
import {CustomButton} from '../Common/CustomButton';
import color from '@/constant/color';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@screens/navigationTypes.ts";

export interface SeaItemProps {
  sigunguName: string;
  coastCode: number;
  coastName: string;
  coastlineLen: string;
  coastLonlat: {
    coordinates: any;
    lat: number; lon: number; }
  setCenter: (coastLonlat: { lat: number; lon: number; }) => void;
}
type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;


const SeaItem = ({sigunguName, coastCode, coastName, coastlineLen, coastLonlat, setCenter}: SeaItemProps) => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  return (
    <View style={styles.seatItemWrapper}>
      <View style={styles.textContainer}>
        <View style={styles.textWrapper}>
          <CustomText style={styles.mainTitle}>행정구역</CustomText>
          <CustomText style={styles.subTitle}>{sigunguName}</CustomText>
        </View>
        <View style={styles.textWrapper}>
          <CustomText style={styles.mainTitle}>해안명</CustomText>
          <CustomText style={styles.subTitle}>{coastName}</CustomText>
        </View>
        <View style={styles.textWrapper}>
          <CustomText style={styles.mainTitle}>해안길이</CustomText>
          <CustomText style={styles.subTitle}>{coastlineLen} m</CustomText>
        </View>
      </View>

      <CustomButton callBack={() => navigation.navigate('SearchMode', {
        coastCode: coastCode
      })}>
        <CustomText
            style={{color: 'white'}}
            onPress={() => {
              const [longitude, latitude] = coastLonlat.coordinates; // coordinates 배열에서 값을 추출
              setCenter({ lat: latitude, lon: longitude }); // setCenter에 전달
            }}
        >선택하기</CustomText>
      </CustomButton>
    </View>
  );
};

export default SeaItem;

const styles = StyleSheet.create({
  seatItemWrapper: {
    position: 'relative',
    width: '100%',
    paddingVertical:30,
    paddingHorizontal:30,
    height: 230,
    backgroundColor: 'white',
    borderRadius: 40,
    shadowColor: '#666666',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 3,
    shadowRadius: 10,
    elevation: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textWrapper: {
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'column',
    gap: 15,
  },
  mainTitle: {
    color: color.gray500,
    fontSize: heightPercentageToDP('1.8%'),
    width: '20%',
  },
  subTitle: {
    fontSize: heightPercentageToDP('1.8%'),
    flex: 1,
    color: color.black,
    fontWeight: 700,
  },
});
