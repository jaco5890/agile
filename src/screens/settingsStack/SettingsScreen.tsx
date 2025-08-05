/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-catch-shadow */
import { HomeStackNavigationProps } from "../../routing/stacks/HomeStack";
import { Colors, Routes } from "../../constants";
import { AuthStackNavigationProps } from "../../routing/stacks/AuthStack";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SettingsStackNavigationProps } from "../../routing/stacks/SettingsStack";

interface Props {
  navigation: SettingsStackNavigationProps<typeof Routes.SETTINGS>;
}

const SettingsScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
        <Text>HI THERE FROM THE Settings SCREEN</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default.white,
  },
});

export default SettingsScreen;
