import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from "react-native";
import { Colors } from "../../../constants";
import { FeatherIcon } from "../../../components/icons";
import { CustomInput } from "../../../components/customInput";
import { IComment } from "../../../interfaces";

type FooterProps = {
  userComment: (comment: IComment) => void;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const PADDING = 16;
const BUTTON_WIDTH = 40;

const AddCommentFooter = (props: FooterProps) => {
  const { userComment } = props;

  const [newComment, setNewComment] = useState<string>("");
  const commentRef: React.RefObject<any> = useRef(null);
  const [isCommentFocused, setIsCommentFocused] = useState(false);

  const onChangeTextComment = (text: string): void => {
    setNewComment(text);
  };

  const clearText = () => {
    setNewComment("");
    setIsCommentFocused(false);
    Keyboard.dismiss();
  };

  const ClearIcon = () => (
    <TouchableOpacity onPress={clearText}>
      <FeatherIcon name="x" size={18} color={Colors.default.dark} />
    </TouchableOpacity>
  );

  const handleAddCommentPressed = () => {
    if (!newComment.trim()) return;

    const comment: IComment = {
      id: Date.now(),
      content: newComment,
      author: {
        id: 1,
        userName: "currentUser",
        firstName: "Current",
        lastName: "User",
        avatar: "",
      },
    };

    clearText();
    userComment(comment);
  };

  const showButton = newComment.length > 0;
  const inputWidth = showButton
    ? SCREEN_WIDTH - (PADDING * 2 + BUTTON_WIDTH + 8)
    : SCREEN_WIDTH - PADDING * 2;

  return (
    <View style={styles.container}>
      <CustomInput
        style={{ width: inputWidth }}
        caption=""
        rightIcon={showButton ? ClearIcon() : null}
        inputRef={commentRef}
        isFocus={isCommentFocused}
        label=""
        size="medium"
        nextInputRef=""
        onInputBlur={() => setIsCommentFocused(false)}
        onInputChangeText={onChangeTextComment}
        onInputFocus={() => setIsCommentFocused(true)}
        placeholder="Add a new comment"
        returnKeyType="done"
        status="basic"
        value={newComment}
      />
      {showButton && (
        <TouchableOpacity
          onPress={handleAddCommentPressed}
          style={styles.addButtonContainer}
        >
          <FeatherIcon name="send" size={20} color={Colors.default.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.default.white,
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.default.inputBorder,
  },
  addButtonContainer: {
    width: 40,
    height: 40,
    marginLeft: 8,
    backgroundColor: Colors.default.primary,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddCommentFooter;
