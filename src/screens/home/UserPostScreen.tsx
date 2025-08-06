import {
  HomeStackNavigationProps,
  HomeStackNavigatorParamList,
} from "../../routing/stacks/HomeStack";
import { Colors, Routes } from "../../constants";
import React, { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, StyleSheet } from "react-native";
import AddPostHeader from "./components/AddPostHeader";
import PostList from "../../components/postList";
import { IPost } from "../../interfaces";
import { mockPosts } from "../../mockData/mockPosts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { mockPostsByAuthors } from "../../mockData/mockPostsByAuthor";
import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "../../components/header";

type Props = StackScreenProps<
  HomeStackNavigatorParamList,
  typeof Routes.USER_POSTS
>;

const UserPosts = ({ navigation, route }: Props) => {
  const { userId } = route.params;
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundPosts = mockPostsByAuthors.filter((p) => p.author.id === userId);
      setPosts(foundPosts.length > 0 ? foundPosts : []);
    };

    fetchPost();
  }, [userId]);

  const handleOnPostPress = (post: IPost) => {
    //post is ignored here, because of how the mock data was setup
    navigation.push(Routes.VIEW_POST, { postId: 1 });
  };

  const handleOnAvatarPress = (userId: number) => {
    navigation.push(Routes.USER_POSTS, { userId });
  };

  const handleOnBackPressed = () => {
    navigation.pop();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={handleOnBackPressed}/>
      <PostList
        posts={posts}
        onPostPressed={handleOnPostPress}
        onAvatarPressed={handleOnAvatarPress}
        avatarPressDisabled={true}
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
    backgroundColor: "white", // or your header bg color
  },
});

export default UserPosts;
