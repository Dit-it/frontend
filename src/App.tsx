import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import Navigator from './screens/Navigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Alert, Platform, StatusBar} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const queryClient = new QueryClient();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

// 위치 권한 요청
const requestLocationPermission = async () => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  try {
    const result = await check(permission);

    if (result === RESULTS.GRANTED) {
      console.log('위치 접근 권한이 이미 허용되었습니다.');
    } else {
      const requestResult = await request(permission);
      console.log('requestResult: ', requestResult);

      if (requestResult === RESULTS.GRANTED) {
        console.log('위치 접근 권한이 허용되었습니다.');
      } else {
        Alert.alert(
          '권한 필요',
          '이 앱은 지도를 표시하고 사용자 위치를 기반으로 서비스를 제공하기 위해 위치 정보에 접근해야 합니다.',
          [{text: '확인'}],
        );
      }
    }
  } catch (error) {
    console.warn(error);
  }
};

const App = () => {
  useEffect(() => {
    requestLocationPermission();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer onReady={() => SplashScreen.hide()} theme={navTheme}>
        <StatusBar backgroundColor={'transparent'} translucent />
        <GestureHandlerRootView style={{flex: 1}}>
          <Navigator />
        </GestureHandlerRootView>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
