import React, { useState } from "react";
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
import { useReduxSelector } from "../redux";
import { selectLogin } from "../redux/reducers/userReducer";
import { FeatherIcon } from "./icons";
import { DeletePopup } from "./deletePopup";

interface Props {
  comments: IComment[];
  onAvatarPress: (userId: number) => void;
}

export const CommentList = ({ comments, onAvatarPress }: Props) => {
  const stateUser = useReduxSelector(selectLogin);
  const [displayDeletePopup, setDisplayDeletePopup] = useState(false);

  const handleDeletePostClicked = () => {
    setDisplayDeletePopup(true);
  };

  const handlePopupOutput = (output: boolean) => {
    if (output) {
      setDisplayDeletePopup(false);
    }
  };

  const renderItem = ({ item }: { item: IComment }) => {
    const isAuthor = stateUser?.userInformation?.id === item.author.id;

    return (
      <View style={styles.commentItem}>
        <TouchableOpacity onPress={() => onAvatarPress(item.author.id)}>
          <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <View style={styles.authorContainer}>
            <Text style={styles.author}>@{item.author.userName}</Text>
            {isAuthor && (
              <TouchableOpacity
                onPress={handleDeletePostClicked}
                style={styles.deleteButton}
              >
                <FeatherIcon
                  name="trash-2"
                  size={20}
                  color={Colors.default.grey}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.content}>{item.content}</Text>
        </View>
        {displayDeletePopup && (
          <DeletePopup
            type={"comment"}
            targetId={item.id}
            popupOutput={handlePopupOutput}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>
        {comments?.length > 0 ? "All Comments" : "No Comments"}
      </Text>
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
    fontWeight: "600",
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
  authorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  deleteButton: {
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
});
