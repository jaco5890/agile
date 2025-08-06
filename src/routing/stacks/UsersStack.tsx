import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Routes } from "../../constants";
import UsersScreen from "../../screens/users/UsersScreen";
import UserPostScreen from "../../screens/home/UserPostScreen";

export type UsersStackNavigatorParamList = {
  [Routes.USERS]: undefined;
  [Routes.USER_POSTS]: { userId: number };
};

export type UsersStackNavigationProps<
  T extends keyof UsersStackNavigatorParamList = typeof Routes.USERS
> = StackNavigationProp<UsersStackNavigatorParamList, T>;

const UsersStack = createStackNavigator<UsersStackNavigatorParamList>();
const UsersStackNavigator = () => {
  return (
    <UsersStack.Navigator screenOptions={{ headerShown: false }}>
      <UsersStack.Screen name={Routes.USERS} component={UsersScreen} />
      <UsersStack.Screen name={Routes.USER_POSTS} component={UserPostScreen} />
    </UsersStack.Navigator>
  );
};

export default UsersStackNavigator;
