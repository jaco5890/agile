import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Routes } from "../../constants";
import HomeScreen from "../../screens/homeStack/HomeScreen";

export type HomeStackNavigatorParamList = {
  [Routes.HOME]: undefined;
};

export type HomeStackNavigationProps<
  T extends keyof HomeStackNavigatorParamList = typeof Routes.DEFAULT
> = StackNavigationProp<HomeStackNavigatorParamList, T>;

const HomeStack = createStackNavigator<HomeStackNavigatorParamList>();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name={Routes.HOME} component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
