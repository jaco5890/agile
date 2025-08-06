import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, Routes } from "../constants";
import { FeatherIcon } from "../components/icons";
import UsersStackNavigator from "./stacks/UsersStack";
import SettingsStackNavigator from "./stacks/SettingsStack";
import HomeStackNavigator from "./stacks/HomeStack";

const Tab = createBottomTabNavigator();

const TabStackNavigation = (): React.ReactElement => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.default.primary,
        tabBarInactiveTintColor: Colors.default.secondary,
        tabBarStyle: {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: Colors.default.white,
          paddingBottom: 10,
          height: 60,
        },
      })}
    >
      <Tab.Screen
        name={Routes.HOME_TAB}
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FeatherIcon
              name="home"
              size={24}
              color={
                focused ? Colors.default.primary : Colors?.default.secondary
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.USERS_TAB}
        component={UsersStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FeatherIcon
              name="users"
              size={24}
              color={
                focused ? Colors.default.primary : Colors?.default.secondary
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.SETTINGS_TAB}
        component={SettingsStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FeatherIcon
              name="settings"
              size={24}
              color={
                focused ? Colors.default.primary : Colors?.default.secondary
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStackNavigation;
