import React, {ReactNode, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {globalStyles} from '@/styles/globalStyles';
import color from '@/constant/color';

interface CustomButtonProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle | TextStyle>;
  callBack?: () => void;
}

export const CustomButton = ({
  children,
  style,
  callBack,
}: CustomButtonProps) => {
  const [buttonPressed, setButtonPressed] = useState(false);

  return (
    <TouchableOpacity
      style={[
        globalStyles.button,
        style,
        buttonPressed && styles.buttonPressed,
      ]} // 클릭 시 더 진한 배경 적용
      onPressIn={() => setButtonPressed(true)} // 클릭 시작 시
      onPressOut={() => setButtonPressed(false)} // 클릭 끝날 때 원래 상태로 복귀
      onPress={callBack}
      activeOpacity={1}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonPressed: {
    backgroundColor: color.primaryDeep, // 클릭 시 더 진한 배경색
  },
});
