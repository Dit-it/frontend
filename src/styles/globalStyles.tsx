import color from '@/constant/color';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const globalStyles = StyleSheet.create({
  commonSafeAreaFlex: {
    flex: 1,
  },
  commonContainer: {
    flex: 1,
    padding: widthPercentageToDP(7),
  },
  alignAllCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: heightPercentageToDP(100),
  },
  input: {
    width: '100%', // 화면 너비의 80%를 사용
    fontSize: heightPercentageToDP('1.8%'),
    height: 50,
    borderColor: color.gray200,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    width: '100%',
    backgroundColor: color.primary,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: color.primaryDeep,
  },
});
