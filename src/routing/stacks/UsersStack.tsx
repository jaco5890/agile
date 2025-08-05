import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Routes } from "../../constants";
import UsersScreen from "../../screens/usersStack.tsx/UsersScreen";

export type UsersStackNavigatorParamList = {
  [Routes.USERS]: undefined;
};

export type UsersStackNavigationProps<
  T extends keyof UsersStackNavigatorParamList = typeof Routes.USERS
> = StackNavigationProp<UsersStackNavigatorParamList, T>;

const UsersStack = createStackNavigator<UsersStackNavigatorParamList>();
const UsersStackNavigator = () => {
  return (
    <UsersStack.Navigator screenOptions={{ headerShown: false }}>
      <UsersStack.Screen name={Routes.USERS} component={UsersScreen} />
    </UsersStack.Navigator>
  );
};

export default UsersStackNavigator;
