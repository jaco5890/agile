import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useReduxSelector } from "../redux";
import { selectIsAuthenticated } from "../redux/reducers/appStateReducer";
import { Routes } from "../constants";
import AuthStackNavigator from "./stacks/AuthStack";
import TabStackNavigation from "./BottomTabNavigator";

const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = () => {
  const isAuthenticated = useReduxSelector(selectIsAuthenticated); // ✅ Move the hook here

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Screen name={Routes.HOME} component={TabStackNavigation} />
        ) : (
          <Screen name={Routes.SIGN_IN} component={AuthStackNavigator} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};
