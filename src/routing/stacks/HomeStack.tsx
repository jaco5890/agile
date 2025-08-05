import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Routes } from "../../constants";
import HomeScreen from "../../screens/homeStack/HomeScreen";
import PostDetailsScreen from "../../screens/homeStack/PostDetailsScreen";

export type HomeStackNavigatorParamList = {
  [Routes.HOME]: undefined;
  [Routes.VIEW_POST]: { postId: number };
};

export type HomeStackNavigationProps<
  T extends keyof HomeStackNavigatorParamList = typeof Routes.HOME
> = StackNavigationProp<HomeStackNavigatorParamList, T>;

const HomeStack = createStackNavigator<HomeStackNavigatorParamList>();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name={Routes.HOME} component={HomeScreen} />
      <HomeStack.Screen name={Routes.VIEW_POST} component={PostDetailsScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
