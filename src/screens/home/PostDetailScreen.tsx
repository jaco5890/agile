import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Platform,
  ActivityIndicator,
} from "react-native";
import { HomeStackNavigatorParamList } from "../../routing/stacks/HomeStack";
import { Colors, Routes } from "../../constants";
import { CommentList } from "../../components/commentList";
import { IComment, IPost } from "../../interfaces";
import { mockPosts } from "../../mockData/mockPosts";
import { StackScreenProps } from "@react-navigation/stack";
import { HeaderWithAvatar } from "../../components/headerWithAvatar";
import { useFocusEffect } from "@react-navigation/native";
import { FeatherIcon } from "../../components/icons";
import { CustomInput } from "../../components/customInput";
import AddCommentFooter from "./components/AddCommentFooter";
import useFetch from "../../hooks/useFetch";
import { getAllPosts } from "../../servicesMock/post.service";

type Props = StackScreenProps<
  HomeStackNavigatorParamList,
  typeof Routes.VIEW_POST
>;

const PostDetailsScreen = ({ navigation, route }: Props) => {
  //if a real api call was made here, the token would have been passed through as well
  const fetchPosts = useCallback(() => getAllPosts("101"), []);

  const { data, isLoading, error } = useFetch(fetchPosts);
  const { postId } = route.params;
  const parentNav = navigation.getParent();

  const [post, setPost] = useState<IPost | null>(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "Retrieving all user posts"
  );

  console.log(data, "DATA");
  useFocusEffect(
    useCallback(() => {
      if (!parentNav) return;

      parentNav.setOptions({ tabBarStyle: { display: "none" } });
      return () => parentNav.setOptions({ tabBarStyle: undefined });
    }, [parentNav])
  );

  useEffect(() => {
    if (isLoading) {
      setLoadingMessage("Retrieving all user posts");
    }
  }, [isLoading]);

  useEffect(() => {
    const fetchPost = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundPost = mockPosts.find((p) => p.id === postId);
      setPost(foundPost || null);
    };

    fetchPost();
  }, [postId]);

  const handleOnAvatarPressed = (userId: number) => {
    console.log(userId, "userId");
    // navigation.push(Routes.VIEW_PROFILE, { userId });
  };

  const handleAddCommentPressed = async (comment: IComment) => {
    setLoadingMessage("Adding comment...");
    setLocalLoading(true);

    try {
      // Simulate API call for adding comment
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      // Handle error
      console.log("Error adding comment", error);
    } finally {
      setLocalLoading(false);
    }
  };

  if (!post) return null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container}>
        <HeaderWithAvatar
          avatarUrl={post.author.avatar}
          username={post.author.userName}
          onBackPress={navigation.goBack}
        />
        <View style={styles.postContainer}>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
        <CommentList
          comments={post.comments}
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
