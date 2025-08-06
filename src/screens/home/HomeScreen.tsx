import { HomeStackNavigationProps } from "../../routing/stacks/HomeStack";
import { Colors, Routes } from "../../constants";
import React, { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, StyleSheet } from "react-native";
import PostList from "../../components/postList";
import { IPost } from "../../interfaces";
import { mockPosts } from "../../mockData/mockPosts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddPostHeader from "./components/AddPostHeader";

interface Props {
  navigation: HomeStackNavigationProps<typeof Routes.HOME>;
}

const HomeScreen = ({ navigation }: Props) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  const headerHeight = 80;

  const opacity = scrollY.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0.3, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    setPosts(mockPosts);
  }, []);

  const handleOnPostPress = (post: IPost) => {
    navigation.navigate(Routes.VIEW_POST, { postId: post.id });
  };

  const handleOnAvatarPressed = (userId: number) => {
    navigation.navigate(Routes.USER_POSTS, { userId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.animatedHeader,
          {
            opacity,
            paddingTop: insets.top,
          },
        ]}
      >
        <AddPostHeader userPost={() => {}} />
      </Animated.View>
      <PostList
        posts={posts}
        onPostPressed={handleOnPostPress}
        onAvatarPressed={handleOnAvatarPressed}
        scrollY={scrollY}
        headerHeight={headerHeight}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default.white,
  },
  animatedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: Colors.default.white,
  },
});

export default HomeScreen;
