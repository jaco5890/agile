import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Routes } from "../../constants";
import LoginScreen from "../../screens/auth/LoginScreen";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";

export type AuthStackNavigatorParamList = {
  [Routes.SIGN_IN]: undefined;
  [Routes.REGISTER]: undefined;
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
      <AuthStack.Screen name={Routes.REGISTER} component={RegisterScreen} />
      <AuthStack.Screen
        name={Routes.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
