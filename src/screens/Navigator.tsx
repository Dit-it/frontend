import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './Splash/Splash';
import RegisterScreen from './Login/RegisterScreen';
import {RootStackParamList} from './navigationTypes';
import SearchModeScreen from './SearchMode/SearchModeScreen';
import {LoginScreen} from './Login/LoginScreen';
import SelectSection from './SearchMode/SelectSection';
import SelectSigungu from './SearchMode/SelectSigungu.tsx';
import CleanModeScreen from '@screens/CleanMode/CleanModeScreen.tsx';
import AdminModeScreen from './AdminMode/AdminModeScreen.tsx';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Login">
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen name="SearchMode" component={SearchModeScreen} />
      <RootStack.Screen name="SelectSigungu" component={SelectSigungu} />
      <RootStack.Screen name="SelectSection" component={SelectSection} />
      <RootStack.Screen
        name="AdminMode"
        component={AdminModeScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <RootStack.Screen name="CleanupMode" component={CleanModeScreen} />
    </RootStack.Navigator>
  );
};

export default Navigator;
