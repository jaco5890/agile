import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors, Routes } from "../constants";
import HomeStackNavigator from "./stacks/HomeStack";
import AntDesign from "@expo/vector-icons/AntDesign";

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
          paddingTop: 10,
          height: 60,
        },
      })}
    >
      <Tab.Screen
        name={Routes.HOME}
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={32}
              color={
                focused ? Colors.default.primary : Colors.default.secondary
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={Routes.COMMENTS_SCREEN}
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={32}
              color={
                focused ? Colors.default.primary : Colors.default.secondary
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStackNavigation;
