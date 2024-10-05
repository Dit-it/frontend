import {ISigunguDropData} from '@/@types/sigunguTypes';
import {getMajorTypeOfLitter} from '@/apis/admin';
import {getSigunguInfo} from '@/apis/selectSection';
import AdminLineChart from '@/components/Admin/AdminLineChart';
import AdminPieChart from '@/components/Admin/AdminPieChart';
import CustomText from '@/components/Common/CustomText';
import {globalStyles} from '@/styles/globalStyles';
import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useQuery} from 'react-query';
import {filter} from '../../../node_modules/domutils/lib/esm/querying';
import {IMajorTypeOfLitterData} from '@/@types/adminChartTypes';
import { Calendar } from 'react-native-calendars';

const AdminModeScreen = () => {
  const [sigunguList, setSigunguList] = useState<ISigunguDropData[]>();
  const [sigunguValue, setSigunguValue] = useState<ISigunguDropData | null>(
    null,
  );
  const [isFocus, setIsFocus] = useState(false);

  const getSigunguInfoHandler = async () => {
    const updateList: ISigunguDropData[] = [];

    const result = await getSigunguInfo();
    // console.log('result: ', result);

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

  const {data: getMajorTypeOfLitterData} = useQuery<IMajorTypeOfLitterData[]>(
    ['MAJORTYPE', sigunguValue],
    () => getMajorTypeOfLitter(),
  );

  useEffect(() => {
    console.log('getMajorTypeOfLitterData: ', getMajorTypeOfLitterData);
  }, [getMajorTypeOfLitterData]);

  return (
    <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
      <View></View>
      <View style={globalStyles.commonContainer}>
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
        <AdminLineChart />
      </View>

      <Calendar/>
    </SafeAreaView>
  );
};

export default AdminModeScreen;

const style = StyleSheet.create({});
