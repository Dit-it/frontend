import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Navigator from './screens/Navigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import SplashScreen from 'react-native-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';

const queryClient = new QueryClient();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
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
