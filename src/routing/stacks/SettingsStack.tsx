import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { Routes } from "../../constants";
import SettingsScreen from "../../screens/settings/SettingsScreen";

export type SettingsStackNavigatorParamList = {
  [Routes.SETTINGS]: undefined;
};

export type SettingsStackNavigationProps<
  T extends keyof SettingsStackNavigatorParamList = typeof Routes.SETTINGS
> = StackNavigationProp<SettingsStackNavigatorParamList, T>;

const SettingsStack = createStackNavigator<SettingsStackNavigatorParamList>();
const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name={Routes.SETTINGS} component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;
