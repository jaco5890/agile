import React from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { IComment } from "../interfaces";
import { Colors } from "../constants";

interface Props {
  comments: IComment[];
  onAvatarPress: (userId: number) => void;
}

export const CommentList = ({ comments, onAvatarPress }: Props) => {
  const renderItem = ({ item }: { item: IComment }) => (
    <View style={styles.commentItem}>
      <TouchableOpacity onPress={() => onAvatarPress(item.author.id)}>
        <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.author}>@{item.author.userName}</Text>
        <Text style={styles.content}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{comments?.length > 0 ? 'All Comments' : 'No Comments'}</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 6,
    color: Colors.default.primary,
  },
  listContent: {
    paddingVertical: 4,
  },
  commentItem: {
    flexDirection: "row",
    paddingBottom: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderBottomColor: Colors.default.inputBorder,
    borderBottomWidth: 1,
    alignItems: "flex-start",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  author: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.default.secondary,
  },
  content: {
    fontSize: 13,
    color: Colors.default.dark,
    marginTop: 2,
  },
});
