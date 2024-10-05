import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from './Splash/Splash';
import RegisterScreen from './Login/RegisterScreen';
import {RootStackParamList} from './navigationTypes';
import SearchModeScreen from './SearchMode/SearchModeScreen';
import {LoginScreen} from './Login/LoginScreen';
import SelectSection from './SearchMode/SelectSection';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <RootStack.Navigator initialRouteName="SelectSection">
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
      <RootStack.Screen name="SelectSection" component={SelectSection} />
      <RootStack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
};

export default Navigator;
