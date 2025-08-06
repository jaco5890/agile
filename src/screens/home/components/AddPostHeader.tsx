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

type HeaderProps = {
  userPost: (post: string) => void;
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const PADDING = 16;
const BUTTON_WIDTH = 40;

const AddPostHeader = (props: HeaderProps) => {
  const { userPost } = props;

  const [post, setPost] = useState("");
  const postRef: React.RefObject<any> = useRef(null);
  const [isPostFocused, setIsPostFocused] = useState(false);

  const onChangeTextPost = (text: any): void => {
    setPost(text);
  };

  const clearText = () => {
    setPost("");
    setIsPostFocused(false);
    Keyboard.dismiss();
  };

  const ClearIcon = () => (
    <TouchableOpacity onPress={clearText}>
      <FeatherIcon name="x" size={18} color={Colors.default.dark} />
    </TouchableOpacity>
  );

  const handleOnAddPostPressed = () => {
    userPost(post);
  };

  const showButton = post.length > 0;
  const inputWidth = showButton
    ? SCREEN_WIDTH - (PADDING * 2 + BUTTON_WIDTH + 8)
    : SCREEN_WIDTH - PADDING * 2;

  return (
    <View style={styles.whiteHeaderContainer}>
      <CustomInput
        style={{ width: inputWidth }}
        caption=""
        rightIcon={showButton ? ClearIcon() : null}
        inputRef={postRef}
        isFocus={isPostFocused}
        label=""
        size="medium"
        nextInputRef=""
        onInputBlur={() => setIsPostFocused(false)}
        onInputChangeText={onChangeTextPost}
        onInputFocus={() => setIsPostFocused(true)}
        placeholder="Add a new post"
        returnKeyType="done"
        status="basic"
        value={post}
      />
      {showButton && (
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={handleOnAddPostPressed}
        >
          <FeatherIcon
            name="plus-circle"
            size={24}
            color={Colors.default.white}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  whiteHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: Colors.default.white,
    paddingHorizontal: 16,
  },
  input: {
    height: 48,
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

export default React.memo(AddPostHeader);
