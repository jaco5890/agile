import { Colors, Routes } from "../../constants";
import React, { useEffect, useReducer, useState } from "react";
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
import { Header } from "../../components/header";
import { userFormReducer } from "../../forms/reducers/userForm.reducer";
import { userInformationInitialFormState } from "../../forms/initialState/userForm.state";
import { FieldKey } from "../../forms/types/userForm.types";
import { validEmail } from "../../utils/regex";
import { CustomInput } from "../../components/customInput";
import { FeatherIcon } from "../../components/icons";
import { register } from "../../servicesMock/auth.service";
import { IRegister } from "../../interfaces";
import { useToast } from "react-native-toast-notifications";
import { AuthStackNavigationProps } from "../../routing/stacks/AuthStack";

interface Props {
  navigation: AuthStackNavigationProps<typeof Routes.REGISTER>;
}

const RegisterScreen = ({ navigation }: Props) => {
  const toast = useToast();

  const [isSecure, setIsSecure] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formState, dispatch] = useReducer(
    userFormReducer,
    userInformationInitialFormState
  );

  useEffect(() => {
    const allFieldsFilled = Object.values(formState).every(
      (field) => field.value.trim() !== ""
    );
    const noErrors = Object.values(formState).every(
      (field) => field.error === ""
    );

    setIsFormValid(allFieldsFilled && noErrors);
  }, [formState]);

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
    const payload: Partial<IRegister> = {};
    (Object.keys(formState) as FieldKey[]).forEach((key) => {
      payload[key] = formState[key].value;
    });
    return payload as IRegister;
  };

  const handleRegisterPress = async () => {
    const valid = validateForm();
    if (!valid) return;
    setLoading(true);

    try {
      const formData = getFormData();
      await register(formData);
      setLoading(false);
      showSuccessToast("Your account has been created successfully");
      navigation.goBack();
    } catch (error) {
      const err = error as Error;
      showErrorToast(err?.message || "Failed to register, please try again");
    }
  };

  const handleOnBackPressed = () => {
    navigation.goBack();
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
    setLoading(false);
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
      <Header onBackPress={handleOnBackPressed} title={""} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.registerTitleText}>Create an account</Text>

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
            onPress={handleRegisterPress}
            style={[
              styles.registerButton,
              {
                backgroundColor: isFormValid
                  ? Colors.default.primary
                  : Colors.default.grey,
              },
            ]}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.registerButtonText}>Register</Text>
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
  registerButton: {
    backgroundColor: Colors.default.primary,
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonText: {
    color: Colors.default.white,
    fontWeight: "600",
    fontSize: 16,
  },
  registerTitleText: {
    fontSize: 22,
    color: Colors.default.primary,
    fontWeight: "600",
    padding: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RegisterScreen;
