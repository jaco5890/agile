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
import { PostPayload } from "../interfaces";
import { FeatherIcon } from "./icons";
import { LatestCommentCard } from "./latestComment";

interface Props {
  post: PostPayload;
  onPostPressed: (post: PostPayload) => void;
  onAvatarPressed: (userId: number) => void;
}

export const PostCard = ({ post, onPostPressed, onAvatarPressed }: Props) => {
  const handleAvatarPress =
    (userId: number) => (event: GestureResponderEvent) => {
      event.stopPropagation();
      onAvatarPressed(userId);
    };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPostPressed(post)}>
      <View style={styles.authorContainer}>
        <TouchableOpacity onPress={handleAvatarPress(post.author.id)}>
          <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.author}>{post.author.userName}</Text>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      <View style={styles.commentCountContainer}>
        <FeatherIcon
          name="message-circle"
          size={14}
          color={Colors.default.grey}
        />
        <Text style={styles.commentCountText}>
          {post.comments.length} Comments
        </Text>
      </View>

      {post.comments?.length > 0 && (
        <View style={styles.commentContainer}>
          <LatestCommentCard
            comment={post.comments[0]}
            onAvatarPress={onAvatarPressed}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: Colors.default.inputBorder,
    borderWidth: 1,
    marginHorizontal: 6,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  author: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.default.secondary,
  },
  content: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.default.dark,
  },
  commentContainer: {
    paddingTop: 10,
  },
  commentTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.default.dark,
  },
  commentContent: {
    color: Colors.default.grey,
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 6,
  },
  commentCountContainer: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 12,
  },
  commentCountText: {
    marginLeft: 4,
    fontSize: 12,
    color: Colors.default.grey,
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
});
