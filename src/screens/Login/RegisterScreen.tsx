import CustomText from '@/components/Common/CustomText';
import { globalStyles } from '@/styles/globalStyles';
import React from 'react';
import {SafeAreaView} from 'react-native';

const RegisterScreen = () => {
  return (
    <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
      <CustomText>RegisterScreen</CustomText>
    </SafeAreaView>
  );
};

export default RegisterScreen;
