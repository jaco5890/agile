import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Routes } from "../../constants";
import HomeScreen from "../../screens/home/HomeScreen";
import PostDetailsScreen from "../../screens/home/PostDetailScreen";
import UserPostScreen from "../../screens/home/UserPostScreen";

export type HomeStackNavigatorParamList = {
  [Routes.HOME]: undefined;
  [Routes.VIEW_POST]: { postId: number };
  [Routes.USER_POSTS]: { userId: number };
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
      <HomeStack.Screen name={Routes.USER_POSTS} component={UserPostScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
