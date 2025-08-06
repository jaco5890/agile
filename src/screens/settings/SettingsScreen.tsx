import { Colors, Routes } from "../../constants";
import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SettingsStackNavigationProps } from "../../routing/stacks/SettingsStack";
import { Header } from "../../components/header";
import { userFormReducer } from "../../forms/reducers/userForm.reducer";
import { userInformationInitialFormState } from "../../forms/initialState/userForm.state";
import { FieldKey } from "../../forms/types/userForm.types";
import { validEmail } from "../../utils/regex";
import { CustomInput } from "../../components/customInput";
import { FeatherIcon } from "../../components/icons";
import { useReduxSelector } from "../../redux";
import { selectLogin, setLogin } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../../redux/reducers/appStateReducer";
import { useToast } from "react-native-toast-notifications";
import { IUser } from "../../interfaces";
import { updateAccount } from "../../servicesMock/auth.service";

interface Props {
  navigation: SettingsStackNavigationProps<typeof Routes.SETTINGS>;
}

const SettingsScreen = ({ navigation }: Props) => {
  const toast = useToast();

  const stateUser = useReduxSelector(selectLogin);
  const reduxDispatch = useDispatch();
  const [isSecure, setIsSecure] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasInitialized = useRef(false);

  const [formState, dispatch] = useReducer(
    userFormReducer,
    userInformationInitialFormState
  );

  useEffect(() => {
    if (stateUser?.userInformation && !hasInitialized.current) {
      populateFormFromUser(
        stateUser.userInformation,
        ['firstName', 'lastName', 'userName', 'email']
      );
      hasInitialized.current = true;
    }
  }, [stateUser?.userInformation]);

  useEffect(() => {
    const allFieldsFilled = Object.values(formState).every(
      (field) => field.value.trim() !== ""
    );
    const noErrors = Object.values(formState).every(
      (field) => field.error === ""
    );

    setIsFormValid(allFieldsFilled && noErrors);
  }, [formState]);

  const populateFormFromUser = (
    user: Partial<IUser>,
    fieldKeys: FieldKey[]
  ) => {
    fieldKeys.forEach((field) => {
      const value = user[field];
      if (value !== undefined) {
        dispatch({ type: 'SET_VALUE', field, value });
        dispatch({ type: 'SET_ERROR', field, error: '' });
        dispatch({ type: 'SET_STATUS', field, status: 'basic' });
      }
    });
  };

  const toggleVisibility = () => {
    setIsSecure(!isSecure);
  };

  const fieldLabels: Record<FieldKey, string> = {
    firstName: "First name",
    lastName: "Last name",
    userName: "Username",
    email: "Email",
    password: "Password",
  };

  const onChangeText = (field: FieldKey, text: string) => {
    const label = fieldLabels[field];

    dispatch({ type: "SET_VALUE", field, value: text });

    if (text.length === 0) {
      dispatch({ type: "SET_ERROR", field, error: `Please enter a ${label}` });
      dispatch({ type: "SET_STATUS", field, status: "danger" });
    } else if (field === "email" && !validEmail.test(text)) {
      dispatch({
        type: "SET_ERROR",
        field,
        error: "Please enter a valid email",
      });
      dispatch({ type: "SET_STATUS", field, status: "danger" });
    } else {
      dispatch({ type: "SET_ERROR", field, error: "" });
      dispatch({ type: "SET_STATUS", field, status: "basic" });
    }
  };

  const validateForm = () => {
    let valid = true;
    (Object.keys(formState) as FieldKey[]).forEach((key) => {
      const value = formState[key].value.trim();

      if (!value || (key === "email" && !validEmail.test(value))) {
        valid = false;
        dispatch({
          type: "SET_ERROR",
          field: key,
          error: !value
            ? `Please enter a ${key}`
            : "Please enter a valid email",
        });
        dispatch({ type: "SET_STATUS", field: key, status: "danger" });
      }
    });
    setIsFormValid(valid);
    return valid;
  };

  const getFormData = () => {
    const payload: Partial<IUser> = {};
    (Object.keys(formState) as FieldKey[]).forEach((key) => {
      payload[key] = formState[key].value;
    });
    return payload as IUser;
  };

  const handleUpdatePress = async () => {
    const valid = validateForm();
    if (!valid) return;

    try {
      setLoading(true);
      const formData = getFormData();
      await updateAccount(formData);
      setLoading(false);
      showSuccessToast("Account updated successfully");
    } catch (error) {
      const err = error as Error;
      showErrorToast(
        err?.message || "Failed to update your account, please try again"
      );
    }
  };

  const handleOnBackPressed = () => {
    navigation.goBack();
  };

  const handleLogoutPressed = () => {
    reduxDispatch(setIsAuthenticated(false));
    reduxDispatch(
      setLogin(
        {
          userName: "",
          firstName: "",
          lastName: "",
          email: "",
        },
        ""
      )
    );
  };

  const showSuccessToast = (message: string) => {
    setLoading(false);
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

  const renderPasswordIcon = () => {
    return (
      <TouchableOpacity onPress={toggleVisibility}>
        <FeatherIcon
          name={isSecure ? "eye" : "eye-off"}
          size={20}
          color={Colors.default.secondary}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={handleOnBackPressed} title={"Account Settings"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="never"
        >
          <CustomInput
            caption={formState.firstName.error}
            inputRef={formState.firstName.ref}
            isFocus={formState.firstName.isFocus}
            label={"First name"}
            size="large"
            nextInputRef={formState.lastName.ref}
            onInputBlur={() =>
              dispatch({
                type: "SET_FOCUS",
                field: "firstName",
                isFocus: false,
              })
            }
            onInputChangeText={(text: any) => onChangeText("firstName", text)}
            onInputFocus={() =>
              dispatch({ type: "SET_FOCUS", field: "firstName", isFocus: true })
            }
            placeholder={""}
            returnKeyType={"next"}
            status={formState.firstName.status}
            value={formState.firstName.value}
          />
          <CustomInput
            caption={formState.lastName.error}
            inputRef={formState.lastName.ref}
            isFocus={formState.lastName.isFocus}
            label={"Last name"}
            size="large"
            nextInputRef={formState.lastName.ref}
            onInputBlur={() =>
              dispatch({ type: "SET_FOCUS", field: "lastName", isFocus: false })
            }
            onInputChangeText={(text: any) => onChangeText("lastName", text)}
            onInputFocus={() =>
              dispatch({ type: "SET_FOCUS", field: "lastName", isFocus: true })
            }
            placeholder={""}
            returnKeyType={"next"}
            status={formState.lastName.status}
            value={formState.lastName.value}
          />
          <CustomInput
            caption={formState.userName.error}
            inputRef={formState.userName.ref}
            isFocus={formState.userName.isFocus}
            label={"Username"}
            size="large"
            nextInputRef={formState.userName.ref}
            onInputBlur={() =>
              dispatch({ type: "SET_FOCUS", field: "userName", isFocus: false })
            }
            onInputChangeText={(text: any) => onChangeText("userName", text)}
            onInputFocus={() =>
              dispatch({ type: "SET_FOCUS", field: "userName", isFocus: true })
            }
            placeholder={""}
            returnKeyType={"next"}
            status={formState.userName.status}
            value={formState.userName.value}
          />
          <CustomInput
            caption={formState.email.error}
            inputRef={formState.email.ref}
            isFocus={formState.email.isFocus}
            label={"Email"}
            size="large"
            nextInputRef={formState.email.ref}
            onInputBlur={() =>
              dispatch({ type: "SET_FOCUS", field: "email", isFocus: false })
            }
            onInputChangeText={(text: any) => onChangeText("email", text)}
            onInputFocus={() =>
              dispatch({ type: "SET_FOCUS", field: "email", isFocus: true })
            }
            placeholder={""}
            returnKeyType={"next"}
            status={formState.email.status}
            value={formState.email.value}
          />
          <CustomInput
            caption={formState.password.error}
            inputRef={formState.password.ref}
            isFocus={formState.password.isFocus}
            secureTextEntry={isSecure}
            label={"Password"}
            size="large"
            nextInputRef={""}
            onInputBlur={() =>
              dispatch({ type: "SET_FOCUS", field: "password", isFocus: false })
            }
            onInputChangeText={(text: any) => onChangeText("password", text)}
            onInputFocus={() =>
              dispatch({ type: "SET_FOCUS", field: "password", isFocus: true })
            }
            placeholder={""}
            returnKeyType={"done"}
            rightIcon={renderPasswordIcon}
            status={formState.password.status}
            value={formState.password.value}
          />

          <TouchableOpacity
            disabled={!isFormValid || loading}
            onPress={handleUpdatePress}
            style={[
              styles.updateButton,
              {
                backgroundColor: isFormValid
                  ? Colors.default.primary
                  : Colors.default.grey,
              },
            ]}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.updateButtonText}>Update</Text>
              {loading && (
                <ActivityIndicator
                  style={{ marginLeft: 8 }}
                  size="small"
                  color={Colors.default.white}
                />
              )}
            </View>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogoutPressed}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default.white,
  },
  scrollContent: {
    paddingBottom: 32,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  updateButton: {
    backgroundColor: Colors.default.primary,
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  updateButtonText: {
    color: Colors.default.white,
    fontWeight: "600",
    fontSize: 16,
  },
  logoutButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: Colors.default.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  logoutText: {
    color: Colors.default.white,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SettingsScreen;
