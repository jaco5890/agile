import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Colors } from "../constants";
import { IComment } from "../interfaces";

interface Props {
  comment: IComment;
  onAvatarPress: (userId: number) => void;
  onShowAllCommentsPress: () => void;
}

export const LatestCommentCard = ({
  comment,
  onAvatarPress,
  onShowAllCommentsPress,
}: Props) => {
  const handlePress = (event: GestureResponderEvent) => {
    event.stopPropagation(); // Prevents parent TouchableOpacity from firing (like in a list row)
    onAvatarPress(comment.author.id);
  };

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentTitle}>Latest Comment:</Text>

      <View style={styles.commentAuthorRow}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={{ uri: comment.author.avatar }}
            style={styles.commentAvatar}
          />
        </TouchableOpacity>
        <Text style={styles.commentAuthor}>@{comment.author.userName}</Text>
      </View>

      <Text style={styles.commentContent}>{comment.content}</Text>

      {onShowAllCommentsPress && (
        <TouchableOpacity onPress={onShowAllCommentsPress}>
          <Text style={styles.showAllComments}>Show all comments</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    borderTopColor: Colors.default.inputBorder,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  commentTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.default.primary,
    marginBottom: 4,
  },
  commentAuthorRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 6,
  },
  commentAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 3,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.default.dark,
  },
  commentContent: {
    color: Colors.default.grey,
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 6,
  },
  showAllComments: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.default.primary,
    marginLeft: 6,
    marginTop: 10,
  },
});
