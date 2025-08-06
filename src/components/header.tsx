import React from "react";
import { View, Image, StyleSheet } from "react-native";
import {
  TopNavigation,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../constants";

type Props = {
  onBackPress: () => void;
  title?: string;
};

export const Header = ({ onBackPress, title = "" }: Props) => {
  const BackAction = () => (
    <TopNavigationAction
      icon={<Feather name="arrow-left" size={24} color="black" />}
      onPress={onBackPress}
    />
  );

  return (
    <View style={styles.headerWrapper}>
      <TopNavigation
        alignment="center"
        accessoryLeft={BackAction}
        title={() => <Text style={styles.title}>{title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.default.inputBorder,
  },
  title: {
    color: Colors.default.primary,
    fontSize: 18,
    fontWeight: "600",
  },
});
