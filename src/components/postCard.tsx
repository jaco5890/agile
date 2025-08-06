import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  GestureResponderEvent,
} from "react-native";
import { Colors } from "../constants";
import { IPost } from "../interfaces";
import { FeatherIcon } from "./icons";
import { LatestCommentCard } from "./latestComment";
import { useReduxSelector } from "../redux";
import { selectLogin } from "../redux/reducers/userReducer";
import { DeletePopup } from "./deletePopup";

interface Props {
  post: IPost;
  onPostPressed: (post: IPost) => void;
  onAvatarPressed: (userId: number) => void;
  avatarPressDisabled?: boolean;
}

export const PostCard = ({
  post,
  onPostPressed,
  onAvatarPressed,
  avatarPressDisabled = false,
}: Props) => {
  const stateUser = useReduxSelector(selectLogin);
  const isAuthor = stateUser?.userInformation?.id === post.author.id;
  const [displayDeletePopup, setDisplayDeletePopup] = useState(false);

  const handleAvatarPress =
    (userId: number) => (event: GestureResponderEvent) => {
      if (!avatarPressDisabled) {
        event.stopPropagation(); // Prevents parent TouchableOpacity from firing (like in a list row)
        onAvatarPressed(userId);
      }
    };

  const handleDeletePostClicked = () => {
    setDisplayDeletePopup(true);
  };

  const handlePopupOutput = (output: boolean) => {
    if (output) {
      setDisplayDeletePopup(false);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPostPressed(post)}>
      <View style={styles.authorContainer}>
        <View style={styles.authorLeft}>
          <TouchableOpacity onPress={handleAvatarPress(post.author.id)}>
            <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.author}>{post.author.userName}</Text>
        </View>

        {isAuthor && (
          <TouchableOpacity onPress={handleDeletePostClicked}>
            <FeatherIcon name="trash-2" size={20} color={Colors.default.grey} />
          </TouchableOpacity>
        )}
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
            onShowAllCommentsPress={() => onPostPressed(post)}
          />
        </View>
      )}

      {displayDeletePopup && (
        <DeletePopup
          type={"post"}
          targetId={post.id}
          popupOutput={handlePopupOutput}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.default.white,
    borderColor: Colors.default.grey,
    borderWidth: 1,
    marginHorizontal: 6,
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
    marginTop: 30,
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
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // NEW: push delete icon to right
    marginBottom: 8,
  },
  authorLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
});
