import { PostPayload } from "../interfaces";
import React from "react";
import { FlatList } from "react-native";
import { PostCard } from "./post";

interface PostListProps {
  posts: PostPayload[];
  onPostPressed: (post: PostPayload) => void;
  onAvatarPressed: (userId: number) => void;
}

const PostList = ({ posts, onPostPressed, onAvatarPressed }: PostListProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onPostPressed={onPostPressed}
          onAvatarPressed={onAvatarPressed}
        />
      )}
    />
  );
};

export default PostList;
