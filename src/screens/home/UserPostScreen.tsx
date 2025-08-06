import {
  HomeStackNavigatorParamList,
} from "../../routing/stacks/HomeStack";
import { Colors, Routes } from "../../constants";
import React, { useCallback } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { IPost } from "../../interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import { Header } from "../../components/header";
import { useToast } from "react-native-toast-notifications";
import { useReduxSelector } from "../../redux";
import { selectLogin } from "../../redux/reducers/userReducer";
import { getUserPost } from "../../servicesMock/post.service";
import useFetch from "../../hooks/useFetch";
import HomeSkeleton from "../../components/skeletons/homeSkeleton";
import PostList from "../../components/postList";

type Props = StackScreenProps<
  HomeStackNavigatorParamList,
  typeof Routes.USER_POSTS
>;

const UserPosts = ({ navigation, route }: Props) => {
  const { userId } = route.params;
  const toast = useToast();
  const stateUser = useReduxSelector(selectLogin);

  //if a real api call was made here, the token would have been passed through as well retrieved from stateUser
  //stateUser.token
  const fetchAllUserPosts = useCallback(() => getUserPost(userId), [userId]);

  const { data, isLoading, error } = useFetch<IPost[]>(fetchAllUserPosts);

  const handleOnPostPress = (post: IPost) => {
    //post is ignored here, because of how the mock data was setup
    navigation.push(Routes.VIEW_POST, { postId: 1 });
  };

  const handleOnAvatarPress = (userId: number) => {
    navigation.push(Routes.USER_POSTS, { userId });
  };

  const handleOnBackPressed = () => {
    navigation.pop();
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

  if (!data) return null;

  if (error) {
    showErrorToast("Failed to retrieve all posts");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={handleOnBackPressed} title={"User Posts"} />
      <PostList
        posts={data}
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
