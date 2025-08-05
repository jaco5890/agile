import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import TabStackNavigation from './BottomTabNavigator';
import { useReduxSelector } from '../redux';
import { selectIsAuthenticated } from '../redux/reducers/appStateReducer';
import { Routes } from '../constants';
import AuthStackNavigator from './stacks/AuthStack';

const {Navigator, Screen} = createStackNavigator();

const CheckStatus = () => {
  return true;
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {CheckStatus() ? (
          <Screen name={Routes.HOME} component={TabStackNavigation} />
        ) : (
          <Screen name={Routes.SIGN_IN} component={AuthStackNavigator} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};
