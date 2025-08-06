import React from "react";
import { FlatList } from "react-native";
import { IAuthor } from "../interfaces/author.interface";
import { UserCard } from "./user";

interface UserListProps {
  users: IAuthor[];
  onAvatarPressed: (userId: number) => void;
}

const UserList = ({ users, onAvatarPressed }: UserListProps) => {
  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <UserCard user={item} onAvatarPressed={onAvatarPressed} />
      )}
    />
  );
};

export default UserList;
