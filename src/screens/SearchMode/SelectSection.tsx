import CustomText from '@/components/Common/CustomText';
import React, {useLayoutEffect, useState} from 'react';
import {RootStackParamList} from '../navigationTypes';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import HeaderLeftGoBack from '@/components/Common/HeaderLeftGoBack';
import NaverMap from '@/components/NaverMap/NaverMap';
import {SafeAreaView, View} from 'react-native';
import {globalStyles} from '@/styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import color from '@/constant/color';
import CarouselContainer from '@/components/NaverMap/Carousel';
import GetPermissionModal from '@/components/GetPermission/GetPermissionModal';
// import Carousel from '@/components/NaverMap/Carousel';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const SelectSection = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '7'},
    {label: 'Item 8', value: '8'},
  ];

  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '지도 선택',
      headerLeft: () => <HeaderLeftGoBack navigation={navigation} />,
    });
  }, [navigation]);

  const seaData = [
    {location: '해운대', seaName: '해안선A', seaLength: '25000'},
    {location: '광안리', seaName: '해안선B', seaLength: '30000'},
    {location: '송정', seaName: '해안선C', seaLength: '30000'},
  ];

  return (
    <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
      <View style={styles.mapContainer}>
        <View style={styles.topSectionWrapper}>
          <View style={styles.topSectionFlexColumn}>
            <Icon size={30} name="list-outline" color="rgba(0,0,0,0.9)" />
            <CustomText>목록</CustomText>
          </View>

          <View style={styles.topSectionFlex}>
            <View style={styles.dropdownContainer}>
              {/* {renderLabel()} */}
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemContainerStyle}
                iconStyle={styles.iconStyle}
                data={data}
                // search
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>

            <View style={styles.dropdownContainer}>
              {/* {renderLabel()} */}
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={styles.itemContainerStyle}
                iconStyle={styles.iconStyle}
                data={data}
                // search
                maxHeight={200}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search"
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
          </View>
        </View>
        {/* <NaverMap /> */}

        {/* <View style={styles.appBackground}>
          <View style={styles.carouselBox}>
            <Carousel />
          </View>
        </View> */}
        {/* <View>
          <Carousel
            images={[
              'https://www.didit.store/img/ggu.png',
              'https://img.hankyung.com/photo/202309/AKR20230901035200005_01_i_P4.jpg',
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSayzFV4TvY_t5ynst6FMKEchrntX5faQ6xVg&s',
            ]}
            gap={10}
            offset={36}
            pageWidth={screenWidth - (10 + 36) * 2}
          />
        </View> */}
        {/* <CarouselContainer /> */}
      </View>
    </SafeAreaView>
  );
};

export default SelectSection;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
    width: '100%',
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  topSectionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 20,
  },
  topSectionFlex: {flexDirection: 'row', alignItems: 'center', gap: 7},
  topSectionFlexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 15,
  },
  dropdownContainer: {
    backgroundColor: 'white',
    width: '40%',
    borderRadius: 100,
  },
  dropdown: {
    height: 37,
    borderColor: color.gray300,
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 12,
  },
  placeholderStyle: {
    fontSize: heightPercentageToDP('1.8%'),
  },
  selectedTextStyle: {
    fontSize: heightPercentageToDP('1.8%'),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: heightPercentageToDP('1.8%'),
  },
  itemContainerStyle: {
    fontSize: heightPercentageToDP('1.8%'),
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 5,
    top: -4,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: heightPercentageToDP('1.1%'),
  },
  swiperContainer: {
    position: 'absolute',
    zIndex: 20,
    bottom: 20,
    backgroundColor: color.primary,
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    height: 200,
    // width: '70%',
  },
  carouselContainer: {
    width: '100%',
  },
  appBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  carouselBox: {
    width: '100%',
    height: '60%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
