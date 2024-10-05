import CustomText from '@/components/Common/CustomText';
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const AdminLineChart = () => {
  return (
    <View>
      <LineChart
        data={{
          labels: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월',
          ],
          datasets: [
            {
              key: 'test',
              data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            },
            {
              key: 'keff',
              data: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
            },
          ],
        }}
        width={Dimensions.get('window').width-widthPercentageToDP(14)} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default AdminLineChart;
