import { Colors, Routes } from "../../constants";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { UsersStackNavigationProps } from "../../routing/stacks/UsersStack";
import { IAuthor } from "../../interfaces/author.interface";
import { mockAuthors } from "../../mockData/mockAuthors";
import UserList from "../../components/userList";
import { Header } from "../../components/header";

interface Props {
  navigation: UsersStackNavigationProps<typeof Routes.USERS>;
}

const UsersScreen = ({ navigation }: Props) => {
  const [users, setUsers] = useState<IAuthor[]>([]);

  useEffect(() => {
    setUsers(mockAuthors);
  }, []);

  const handleOnAvatarPressed = (userId: number) => {
    navigation.navigate(Routes.USER_POSTS, { userId });
  };

  const handleOnBackButtonPressed = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={handleOnBackButtonPressed} title="All Users"/>
      <UserList
        users={users}
        onAvatarPressed={handleOnAvatarPressed}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default.white,
  },
});

export default UsersScreen;
