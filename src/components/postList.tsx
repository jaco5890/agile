import { IPost } from "../interfaces";
import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import { PostCard } from "./post";
import { Colors } from "../constants";

interface PostListProps {
  posts: IPost[];
  onPostPressed: (post: IPost) => void;
  onAvatarPressed: (userId: number) => void;
  scrollY?: Animated.Value;
  headerHeight?: number;
  avatarPressDisabled?: boolean;
}

const PostList = ({
  posts,
  onPostPressed,
  onAvatarPressed,
  scrollY,
  headerHeight = 0,
  avatarPressDisabled = false,
}: PostListProps) => {
  return (
    <Animated.FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onPostPressed={onPostPressed}
          onAvatarPressed={onAvatarPressed}
          avatarPressDisabled = {avatarPressDisabled}
        />
      )}
      onScroll={
        scrollY
          ? Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )
          : undefined
      }
      scrollEventThrottle={16}
      contentContainerStyle={[styles.container, { paddingTop: headerHeight }]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height,
  },
});

export default PostList;
