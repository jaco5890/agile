import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Routes } from "../../constants";
import LoginScreen from "../../screens/authStack/LoginScreen";

export type AuthStackNavigatorParamList = {
  [Routes.SIGN_IN]: undefined;
  [Routes.FORGOT_PASSWORD]: undefined;
};

export type AuthStackNavigationProps<
  T extends keyof AuthStackNavigatorParamList = typeof Routes.SIGN_IN
> = StackNavigationProp<AuthStackNavigatorParamList, T>;

const AuthStack = createStackNavigator<AuthStackNavigatorParamList>();
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={Routes.SIGN_IN}
    >
      <AuthStack.Screen name={Routes.SIGN_IN} component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
