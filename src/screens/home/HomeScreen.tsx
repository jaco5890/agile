import { HomeStackNavigationProps } from "../../routing/stacks/HomeStack";
import { Colors, Routes } from "../../constants";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, StyleSheet } from "react-native";
import { IPost } from "../../interfaces";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToast } from "react-native-toast-notifications";
import { useReduxSelector } from "../../redux";
import { selectLogin } from "../../redux/reducers/userReducer";
import { addPost, getAllPosts } from "../../servicesMock/post.service";
import { IAuthor } from "../../interfaces/author.interface";
import useFetch from "../../hooks/useFetch";
import AddPostHeader from "./components/AddPostHeader";
import HomeSkeleton from "../../components/skeletons/homeSkeleton";
import PostList from "../../components/postList";
import { useFocusEffect } from "@react-navigation/native";
interface Props {
  navigation: HomeStackNavigationProps<typeof Routes.HOME>;
}

const HomeScreen = ({ navigation }: Props) => {
  const toast = useToast();
  const stateUser = useReduxSelector(selectLogin);

  //if a real api call was made here, the token would have been passed through as well retrieved from stateUser
  //if a real api call was made here, the postId would have been passed through as well retrieved from stateUser
  //stateUser.token
  //stateUser.userInformation.id
  const fetchAllPosts = useCallback(() => getAllPosts(101), []);

  const { data, isLoading, error } = useFetch<IPost[]>(fetchAllPosts);
  const [posts, setPosts] = useState<IPost[]>([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      if (data?.length) {
        //manually setting posts to append list after adding new post
        setPosts(data);
      }
    }, [data])
  );

  const headerHeight = 80;

  const opacity = scrollY.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0.3, 0],
    extrapolate: "clamp",
  });

  const handleOnPostPress = (post: IPost) => {
    navigation.navigate(Routes.VIEW_POST, { postId: post.id });
  };

  const handleOnAvatarPressed = (userId: number) => {
    navigation.navigate(Routes.USER_POSTS, { userId });
  };

  const handleOnAddPostPressed = async (post: string) => {
    try {
      const currentAuthor: IAuthor = {
        id: stateUser.userInformation.id,
        userName: stateUser.userInformation.userName,
        firstName: stateUser.userInformation.firstName,
        lastName: stateUser.userInformation.lastName,
        avatar: stateUser.userInformation.avatar,
      };

      const newPost: IPost = {
        id: Date.now(),
        content: post,
        author: currentAuthor,
        comments: [],
      };

      let commentResponse = await addPost(newPost);
      if (commentResponse?.id) {
        showSuccessToast("New post added successfully");
        //adding latest post to list
        setPosts((prev) => [commentResponse, ...prev]);
      } else {
        showErrorToast("Failed to add new post");
      }
    } catch (error) {
      const err = error as Error;
      showErrorToast(err?.message || "Failed to add post, please try again");
    }
  };

  const showSuccessToast = (message: string) => {
    toast.show(message, {
      type: "success",
      placement: "bottom",
      duration: 3000,
      animationType: "slide-in",
    });
  };

  const showErrorToast = (message: string) => {
    toast.show(message, {
      type: "danger",
      placement: "bottom",
      duration: 3000,
      animationType: "slide-in",
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <HomeSkeleton />
        <HomeSkeleton />
      </SafeAreaView>
    );
  }

  if (!posts) return null;

  if (error) {
    showErrorToast("Failed to retrieve all posts");
  }

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
        <AddPostHeader userPost={handleOnAddPostPressed} />
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
