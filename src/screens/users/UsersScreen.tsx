import { Colors, Routes } from "../../constants";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { UsersStackNavigationProps } from "../../routing/stacks/UsersStack";
import { IAuthor } from "../../interfaces/author.interface";
import { mockAuthors } from "../../mockData/mockAuthors";
import { Header } from "../../components/header";
import { useReduxSelector } from "../../redux";
import { selectLogin } from "../../redux/reducers/userReducer";
import { getAllUsers } from "../../servicesMock/users.service";
import { useToast } from "react-native-toast-notifications";
import UsersSkeleton from "../../components/skeletons/usersSkeleton";
import UserList from "../../components/userList";
import useFetch from "../../hooks/useFetch";

interface Props {
  navigation: UsersStackNavigationProps<typeof Routes.USERS>;
}

const UsersScreen = ({ navigation }: Props) => {
  const toast = useToast();
  const stateUser = useReduxSelector(selectLogin);

  //if a real api call was made here, the token would have been passed through as well retrieved from stateUser
  //if a real api call was made here, the postId would have been passed through as well retrieved from stateUser
  //stateUser.token
  //stateUser.userInformation.id
  const fetchAllUsers = useCallback(() => getAllUsers(101), []);

  const { data, isLoading, error } = useFetch<IAuthor[]>(fetchAllUsers);
  const [users, setUsers] = useState<IAuthor[]>([]);

  useEffect(() => {
    setUsers(mockAuthors);
  }, []);

  const handleOnAvatarPressed = (userId: number) => {
    navigation.navigate(Routes.USER_POSTS, { userId });
  };

  const handleOnBackButtonPressed = () => {
    navigation.goBack();
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
        <UsersSkeleton />
        <UsersSkeleton />
        <UsersSkeleton />
      </SafeAreaView>
    );
  }

  if (!data) return null;

  if (error) {
    showErrorToast("Failed to retrieve all posts");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={handleOnBackButtonPressed} title="All Users" />
      <UserList users={users} onAvatarPressed={handleOnAvatarPressed} />
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
