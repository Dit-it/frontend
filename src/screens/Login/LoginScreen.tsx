import CustomText from '@/components/Common/CustomText';
import color from '@/constant/color';
import {globalStyles} from '@/styles/globalStyles';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {RootStackParamList} from '../navigationTypes';
import {StackNavigationProp} from '@react-navigation/stack';
import {CustomButton} from '@/components/Common/CustomButton';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export const LoginScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const loginSubmitHandler = () => {
    // navigation.navigate('CleanupMode');
    navigation.navigate('SelectSigungu');
    // navigation.navigate('SearchMode');
  };

  return (
    <SafeAreaView style={globalStyles.commonSafeAreaFlex}>
      <View style={[globalStyles.alignAllCenter, globalStyles.commonContainer]}>
        <View style={styles.imgWrap}>
          <Image
            style={styles.img}
            source={require('@assets/logo/logo_vertical(color).png')}
          />
        </View>

        <View style={styles.flexGap}>
          <TextInput
            style={globalStyles.input}
            placeholder="아이디를 입력해주세요."
            autoCapitalize="none"
          />
          <TextInput
            style={globalStyles.input}
            placeholder="비밀번호를 입력해주세요."
            secureTextEntry={true}
          />
        </View>

        <CustomButton callBack={loginSubmitHandler}>
          <CustomText style={styles.buttonText}>로그인</CustomText>
        </CustomButton>

        <View style={styles.infoText}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('Register')}>
            <CustomText style={styles.linkText}>회원가입</CustomText>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}>
            <CustomText style={styles.linkText}>비밀번호 찾기</CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: '#ffffff',
    fontWeight: 500,
  },
  imgWrap: {
    width: widthPercentageToDP(40),
  },
  img: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  flexGap: {
    width: '100%',
    flexDirection: 'column',
    gap: 5,
    marginBottom: 15,
  },
  infoText: {
    width: widthPercentageToDP(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 100,
  },
  linkText: {
    color: color.gray500,
    fontSize: heightPercentageToDP('1.7%'),
  },
});
