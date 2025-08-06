import { Colors, Routes } from "../../constants";
import React, {  } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
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
