import {ISigunguDropData} from '@/@types/sigunguTypes';
import {getDownloadExcel, getMajorTypeOfLitter} from '@/apis/admin';
import {
  getCleanupDataGroupBySigungu,
  getSigunguInfo,
} from '@/apis/selectSection';
import AdminLineChart from '@/components/Admin/AdminLineChart';
import AdminPieChart from '@/components/Admin/AdminPieChart';
import CustomText from '@/components/Common/CustomText';
import {globalStyles} from '@/styles/globalStyles';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useQuery} from 'react-query';
import {filter} from '../../../node_modules/domutils/lib/esm/querying';
import {ICoastData, IMajorTypeOfLitterData} from '@/@types/adminChartTypes';
import {Calendar} from 'react-native-calendars';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import color from '@/constant/color';
import NaverMapWithCircle from '@/components/NaverMap/NaverMapWithCircle';
import {
  NaverMapCircleOverlay,
  NaverMapMarkerOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map';

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const AdminModeScreen = () => {
  const [sigunguList, setSigunguList] = useState<ISigunguDropData[]>();
  const [sigunguValue, setSigunguValue] = useState<ISigunguDropData | null>(
    null,
  );
  const [isFocus, setIsFocus] = useState(false);
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [isStartDateModalVisible, setStartDateModalVisible] = useState(false);
  const [isEndDateModalVisible, setEndDateModalVisible] = useState(false);

  const {data: cleanUpDataResponse} = useQuery<ICoastData[]>(
    ['CLEANUPDATA'],
    () => getCleanupDataGroupBySigungu(),
  );

  useEffect(() => {
    console.log('cleanUpDataResponse: ', cleanUpDataResponse);
  }, [cleanUpDataResponse]);

  const {data: getMajorTypeOfLitterData} = useQuery<IMajorTypeOfLitterData[]>(
    ['MAJORTYPE', sigunguValue],
    () => getMajorTypeOfLitter(),
  );

  const circleSize = (totalSize: number) => {
    const baseSize = 20; // 기본 사이즈
    return baseSize + Math.floor(totalSize / 50) * 5; // 50 단위로 사이즈 증가
  };

  const getSigunguInfoHandler = async () => {
    const updateList: ISigunguDropData[] = [];

    const result = await getSigunguInfo();
    if (result.length > 0) {
      result.map(list => {
        const data = {
          label: list.sigunguName,
          value: list.sigunguCode,
        };
        updateList.push(data);
      });
    }
    setSigunguList(updateList);
  };
  getSigunguInfoHandler();

  return (
    <>
      <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
        <View style={globalStyles.commonContainer}>
          <View style={[styles.flexGap]}>
            <TextInput
              value={startDate}
              style={styles.input}
              placeholder="시작일"
              autoCapitalize="none"
              onPress={() => setStartDateModalVisible(true)}
            />
            <TextInput
              value={endDate}
              style={styles.input}
              placeholder="종료일"
              autoCapitalize="none"
              onPress={() => setEndDateModalVisible(true)}
            />
            <TouchableOpacity style={styles.searchBtn}>
              <CustomText>검색</CustomText>
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 15}}>
            <AdminPieChart
              sigunguList={sigunguList ? sigunguList : []}
              sigunguValue={sigunguValue}
              setSigunguValue={setSigunguValue}
              isFocus={isFocus}
              hideFocus={() => setIsFocus(false)}
              showFocus={() => setIsFocus(true)}
              pieData={getMajorTypeOfLitterData?.filter(
                list => list.sigunguCode === sigunguValue?.value,
              )}
            />
          </View>
          {/* <AdminLineChart /> */}

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 'auto',
                marginBottom: 6,
                marginTop: 6,
              }}>
              <TouchableOpacity>
                <CustomText>확대하기</CustomText>
              </TouchableOpacity>
              <View
                style={{
                  width: 1,
                  height: 13,
                  backgroundColor: color.gray400,
                  marginHorizontal: 7,
                }}></View>
              <TouchableOpacity onPress={() => getDownloadExcel()}>
                <CustomText onPress={() => getDownloadExcel()}>다운로드</CustomText>
              </TouchableOpacity>
            </View>
            <NaverMapView
              style={[styles.fullMap]}
              isShowLocationButton={false}
              initialCamera={{
                latitude: 35.1796,
                longitude: 129.0756,
                zoom: 9,
              }}>
              {/* <NaverMapCircleOverlay
                latitude={35.1796}
                longitude={129.0756}
                radius={1000}
                color={'#ff00006b'}
                isHidden={false}
                outlineColor={'#aaa'}
                outlineWidth={0}
                globalZIndex={-1}
                isMinZoomInclusive={false}
                isMaxZoomInclusive={false}
                onTap={() => console.log('hi')}
                zIndex={40}
              /> */}

              {/* 개수를 표시하는 마커 */}
              {cleanUpDataResponse &&
                cleanUpDataResponse.map((list, index) => {
                  const parsedLonLat = JSON.parse(list.coastLonlat.toString()); // JSON 문자열을 객체로 변환
                  const [longitude, latitude] = parsedLonLat.coordinates; // 위도와 경도 추출
                  return (
                    <NaverMapMarkerOverlay
                      key={index}
                      latitude={latitude}
                      longitude={longitude}
                      width={circleSize(list.totalCleanupLitter)} // 원하는 크기로 조정 가능
                      height={circleSize(list.totalCleanupLitter)}>
                      <View
                        style={[
                          styles.marker,
                          {
                            width: circleSize(list.totalCleanupLitter),
                            height: circleSize(list.totalCleanupLitter),
                          },
                        ]}>
                        <Text style={styles.markerText}>
                          {list.totalCleanupLitter}
                        </Text>
                      </View>
                    </NaverMapMarkerOverlay>
                  );
                })}
              {/* <NaverMapMarkerOverlay
                latitude={35.1796}
                longitude={129.0756}
                width={30} // 원하는 크기로 조정 가능
                height={30}>
                <View style={styles.marker}>
                  <Text style={styles.markerText}>{1}</Text>
                </View>
              </NaverMapMarkerOverlay> */}
            </NaverMapView>
          </View>
        </View>
      </SafeAreaView>
      <Modal
        visible={isStartDateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setStartDateModalVisible(false);
        }}>
        <TouchableWithoutFeedback
          onPress={() => setStartDateModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Calendar
                onDayPress={day => {
                  setStartDate(day.dateString);
                  setStartDateModalVisible(false);
                  setEndDateModalVisible(true);
                }}
                monthFormat="yyyy.MM"
                maxDate={formatDate(new Date())}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={isEndDateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setEndDateModalVisible(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setEndDateModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Calendar
                onDayPress={day => {
                  setEndDate(day.dateString);
                  setEndDateModalVisible(false);
                }}
                monthFormat="yyyy.MM"
                maxDate={formatDate(new Date())}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={isStartDateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setStartDateModalVisible(false);
        }}>
        <TouchableWithoutFeedback
          onPress={() => setStartDateModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Calendar
                onDayPress={day => {
                  setStartDate(day.dateString);
                  setStartDateModalVisible(false);
                  setEndDateModalVisible(true);
                }}
                monthFormat="yyyy.MM"
                maxDate={formatDate(new Date())}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default AdminModeScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  flexGap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    width: '39%',
    fontSize: heightPercentageToDP('1.8%'),
    height: 50,
    backgroundColor: color.gray100,
    borderColor: color.gray200,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: '1.5%',
  },
  searchBtn: {
    width: '19%',
    height: 50,
    borderWidth: 1,
    borderColor: color.gray500,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fullMap: {
    height: heightPercentageToDP(30),
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(23, 88, 228,0.5)', // 텍스트 배경색
    borderRadius: 50, // 동그랗게 만들기
  },
  markerText: {
    fontWeight: 'bold',
    fontSize: 13, // 텍스트 크기
    color: 'rgb(255, 255, 255)', // 텍스트 색상
  },
});
