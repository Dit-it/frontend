import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import Navigator from './screens/Navigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Alert, Platform, StatusBar} from 'react-native';
import GetPermissionModal from './components/GetPermission/GetPermissionModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  const [getPermission, setPermission] = useState(false);

  // AsyncStorage에서 'permissionsRequested' 플래그 가져오기
  useEffect(() => {
    const checkPermissionsRequested = async () => {
      try {
        const permissionFlag = await AsyncStorage.getItem(
          'permissionsRequested',
        );
        if (!permissionFlag) {
          // 권한 요청을 한 번도 하지 않은 경우 모달을 띄우도록 설정
          setPermission(true);
        }
      } catch (error) {
        console.warn('권한 플래그 확인 중 오류:', error);
      }
    };

    checkPermissionsRequested();
  }, []);

  const hidePermission = async () => {
    setPermission(false);
    // 권한 모달을 숨긴 후 AsyncStorage에 'permissionsRequested' 플래그 저장
    try {
      await AsyncStorage.setItem('permissionsRequested', 'true');
    } catch (error) {
      console.warn('플래그 저장 중 오류:', error);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer onReady={() => SplashScreen.hide()} theme={navTheme}>
        <StatusBar backgroundColor={'transparent'} translucent />
        <GestureHandlerRootView style={{flex: 1}}>
          <Navigator />
          {getPermission && <GetPermissionModal onHide={hidePermission} />}
        </GestureHandlerRootView>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
