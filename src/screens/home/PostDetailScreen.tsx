import React, { useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { HomeStackNavigatorParamList } from "../../routing/stacks/HomeStack";
import { Colors, Routes } from "../../constants";
import { CommentList } from "../../components/commentList";
import { IComment, IPost } from "../../interfaces";
import { StackScreenProps } from "@react-navigation/stack";
import { HeaderWithAvatar } from "../../components/headerWithAvatar";
import { useFocusEffect } from "@react-navigation/native";
import { getPost } from "../../servicesMock/post.service";
import { useToast } from "react-native-toast-notifications";
import { addComment } from "../../servicesMock/comment.service";
import { useReduxSelector } from "../../redux";
import { selectLogin } from "../../redux/reducers/userReducer";
import AddCommentFooter from "./components/AddCommentFooter";
import useFetch from "../../hooks/useFetch";
import PostDetailsSkeleton from "../../components/skeletons/postDetailsSkeleton";

type Props = StackScreenProps<
  HomeStackNavigatorParamList,
  typeof Routes.VIEW_POST
>;

const PostDetailsScreen = ({ navigation, route }: Props) => {
  const { postId } = route.params;
  const stateUser = useReduxSelector(selectLogin);
  //if a real api call was made here, the token would have been passed through as well retrieved from stateUser
  //if a real api call was made here, the postId would have been passed through as well retrieved from stateUser
  //stateUser.token
  const fetchPosts = useCallback(() => getPost(postId), [postId]);

  const { data, isLoading, error } = useFetch<IPost>(fetchPosts);
  const parentNav = navigation.getParent();
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      if (!parentNav) return;

      parentNav.setOptions({ tabBarStyle: { display: "none" } });
      return () => parentNav.setOptions({ tabBarStyle: undefined });
    }, [parentNav])
  );

  const handleOnAvatarPressed = (userId: number) => {
    navigation.navigate(Routes.USER_POSTS, { userId });
  };

  const handleOnBackPressed = () => {
    navigation.goBack();
  };

  const handleAddCommentPressed = async (comment: IComment) => {
    try {
      let commentResponse = await addComment(comment);
      if (commentResponse?.id) {
        showSuccessToast("New comment added successfully");
      } else {
        showErrorToast("Failed to add new comment");
      }
    } catch (error) {
      const err = error as Error;
      showErrorToast(err?.message || "Failed to add comment, please try again");
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
        <PostDetailsSkeleton />
        <PostDetailsSkeleton />
      </SafeAreaView>
    );
  }

  if (!data) return null;

  if (error) {
    showErrorToast("Failed to retrieve post");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container}>
        <HeaderWithAvatar
          avatarUrl={data.author.avatar}
          username={data.author.userName}
          onBackPress={handleOnBackPressed}
        />
        <View style={styles.postContainer}>
          <Text style={styles.postContent}>{data.content}</Text>
        </View>
        <CommentList
          comments={data.comments}
          onAvatarPress={handleOnAvatarPressed}
        />
        <AddCommentFooter userComment={handleAddCommentPressed} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default.white,
  },
  postContainer: {
    marginVertical: 12,
  },
  postContent: {
    color: Colors.default.dark,
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 12,
  },
});

export default PostDetailsScreen;
