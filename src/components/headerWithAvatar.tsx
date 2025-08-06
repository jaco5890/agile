import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { TopNavigation, TopNavigationAction, Text } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";

type Props = {
  avatarUrl: string;
  username: string;
  onBackPress: () => void;
};

export const HeaderWithAvatar = ({ avatarUrl, username, onBackPress }: Props) => {
  const BackAction = () => (
    <TopNavigationAction
      icon={<Feather name="arrow-left" size={24} color="black" />}
      onPress={onBackPress}
    />
  );

  const Title = () => (
    <View style={styles.titleContainer}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <Text category="s1" style={styles.username}>
        @{username}
      </Text>
    </View>
  );

  return (
    <TopNavigation
      alignment="start"
      accessoryLeft={BackAction}
      title={Title}
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 6,
    marginLeft: 12,
  },
  username: {
    fontSize: 16,
  },
});
