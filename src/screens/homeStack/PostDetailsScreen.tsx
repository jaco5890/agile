import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import {
  HomeStackNavigatorParamList,
} from "../../routing/stacks/HomeStack";
import { Colors, Routes } from "../../constants";
import { CommentList } from "../../components/commentList";
import { PostPayload } from "../../interfaces";
import { mockPosts } from "../../mockData/mockPosts";
import { StackScreenProps } from "@react-navigation/stack";
import { HeaderWithAvatar } from "../../components/headerWithAvatar";

type Props = StackScreenProps<
  HomeStackNavigatorParamList,
  typeof Routes.VIEW_POST
>;

const PostDetailsScreen = ({ navigation, route }: Props) => {
  const { postId } = route.params;

  const [post, setPost] = useState<PostPayload | null>(null);

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

  if (!post) return null; // You could show a loader here

  return (
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
    </SafeAreaView>
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
