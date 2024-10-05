import {
  IMajorTypeOfLitterData,
  IPieData,
  litterName,
} from '@/@types/adminChartTypes';
import {ISigunguDropData} from '@/@types/sigunguTypes';
import color from '@/constant/color';
import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {Dropdown} from 'react-native-element-dropdown';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import CustomText from '../Common/CustomText';

interface AdminPieChartProps {
  sigunguList: ISigunguDropData[];
  sigunguValue: ISigunguDropData | null;
  setSigunguValue: React.Dispatch<
    React.SetStateAction<ISigunguDropData | null>
  >;
  isFocus: boolean;
  showFocus: () => void;
  hideFocus: () => void;
  pieData: IMajorTypeOfLitterData[] | undefined;
}

const AdminPieChart = ({
  sigunguValue,
  setSigunguValue,
  isFocus,
  showFocus,
  hideFocus,
  sigunguList,
  pieData,
}: AdminPieChartProps) => {
  const [data, setData] = useState<IPieData[]>();

  const findColorHandler = (name: string) => {
    let result = '';
    if (name === litterName.fishing) {
      result = 'rgb(14, 68, 169)';
    } else if (name === litterName.floating) {
      result = 'rgb(169, 97, 14)';
    } else if (name === litterName.trash) {
      result = 'rgb(95, 35, 185)';
    } else if (name === litterName.bigTrash) {
      result = 'rgb(158, 29, 29)';
    } else if (name === litterName.tree) {
      result = 'rgb(14, 169, 61)';
    }

    return result;
  };

  useEffect(() => {
    if (pieData && pieData.length > 0) {
      let updatedData: IPieData[] = [];
      pieData.map(list => {
        console.log('pieData: ', pieData);

        updatedData.push({
          name: list.litterTypeName,
          population:
            list.totalCleanupLitter && Number(list.totalCleanupLitter),
          color: findColorHandler(list.litterTypeName),
        });
      });

      setData(updatedData);
    }
  }, [pieData]);

  return (
    <SafeAreaView
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        backgroundColor: color.gray100,
        height: 220,
        borderRadius: 16,
      }}>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemContainerStyle}
          iconStyle={styles.iconStyle}
          data={sigunguList ? sigunguList : []}
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? '구 선택' : '...'}
          searchPlaceholder="Search..."
          value={sigunguValue?.value}
          onFocus={showFocus}
          onBlur={hideFocus}
          onChange={item => {
            setSigunguValue({
              label: item.label,
              value: item.value,
            });
            hideFocus();
          }}
        />
      </View>

      {pieData?.length === 0 ? (
        <View>
          <CustomText>데이터가 없습니다.</CustomText>
        </View>
      ) : (
        <>
          <View style={{position: 'absolute', left: '5%', bottom: '7%'}}>
            {pieData?.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                <View
                  style={{
                    width: 14,
                    height: 14,
                    backgroundColor: findColorHandler(item.litterTypeName),
                    marginRight: 5,
                    borderRadius: 50,
                  }}
                />
                <Text
                  style={{
                    color: color.gray700,
                    fontSize: heightPercentageToDP('1.3%'),
                  }}>
                  {item.litterTypeName}
                </Text>
              </View>
            ))}
          </View>

          {/* 오른쪽에 차트 배치 */}
          <View style={{position: 'absolute', left: '25%', top: '5%'}}>
            <PieChart
              data={data || []}
              width={Dimensions.get('window').width - 100} // legend 공간 확보를 위해 너비 조정
              height={200}
              hasLegend={false}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              // absolute
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default AdminPieChart;

const styles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: 'white',
    width: '28%',
    borderRadius: 100,
    position: 'absolute',
    top: 10,
    left: '5%',
  },
  dropdown: {
    height: 37,
    borderColor: color.gray300,
    borderWidth: 0.5,
    borderRadius: 100,
    paddingHorizontal: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  placeholderStyle: {
    fontSize: heightPercentageToDP('1.5%'),
  },
  selectedTextStyle: {
    fontSize: heightPercentageToDP('1.5%'),
  },
  inputSearchStyle: {
    height: 40,
    fontSize: heightPercentageToDP('1.5%'),
  },
  itemContainerStyle: {
    fontSize: heightPercentageToDP('1.5%'),
  },
});
