import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  GestureResponderEvent,
} from "react-native";
import { Colors } from "../constants";
import { IAuthor } from "../interfaces/author.interface";

interface Props {
  user: IAuthor;
  onAvatarPressed: (userId: number) => void;
}

export const UserCard = ({ user, onAvatarPressed }: Props) => {
  const handleAvatarPress =
    (userId: number) => (event: GestureResponderEvent) => {
      event.stopPropagation(); // Prevents parent TouchableOpacity from firing (like in a list row)
      onAvatarPressed(userId);
    };

  return (
    <TouchableOpacity onPress={handleAvatarPress(user.id)} style={styles.card}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />

      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.username}>@{user.userName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.default.white,
    borderColor: Colors.default.grey,
    borderWidth: 1,
    marginHorizontal: 6,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.default.dark,
  },
  username: {
    fontSize: 14,
    color: Colors.default.grey,
  },
});
