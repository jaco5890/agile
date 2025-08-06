import {
  LoginFieldKey,
} from "../../forms/types/loginForm.types";
import { AppVersion, Colors, Images, Routes } from "../../constants";
import { AuthStackNavigationProps } from "../../routing/stacks/AuthStack";
import React, { useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { loginFormReducer } from "../../forms/reducers/loginForm.reducer";
import { loginInitialFormState } from "../../forms/initialState/loginForm.state";
import { CustomInput } from "../../components/customInput";
import { FeatherIcon } from "../../components/icons";
import { ILogin } from "../../interfaces";
import { useToast } from "react-native-toast-notifications";
import { login } from "../../servicesMock/auth.service";
import { useDispatch } from "react-redux";
import { selectLogin, setLogin } from "../../redux/reducers/userReducer";
import { setIsAuthenticated } from "../../redux/reducers/appStateReducer";
import { useReduxSelector } from "../../redux";

interface Props {
  navigation: AuthStackNavigationProps<typeof Routes.SIGN_IN>;
}

const LoginScreen = ({ navigation }: Props) => {
  const toast = useToast();
  const stateUser = useReduxSelector(selectLogin);
  const loginDispatch = useDispatch();
  const [isSecure, setIsSecure] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formState, dispatch] = useReducer(
    loginFormReducer,
    loginInitialFormState
  );

  useEffect(() => {
    if (stateUser?.token?.length) {
      loginDispatch(setIsAuthenticated(true));
    }
  })
  
  useEffect(() => {
    const allFieldsFilled = Object.values(formState).every(
      (field) => field.value.trim() !== ""
    );
    const noErrors = Object.values(formState).every(
      (field) => field.error === ""
    );

    setIsFormValid(allFieldsFilled && noErrors);
  }, [formState]);

  const fieldLabels: Record<LoginFieldKey, string> = {
    userName: "Username",
    password: "Password",
  };

  const onChangeText = (field: LoginFieldKey, text: string) => {
    const label = fieldLabels[field];

    dispatch({ type: "SET_VALUE", field, value: text });

    if (text.length === 0) {
      dispatch({ type: "SET_ERROR", field, error: `Please enter a ${label}` });
      dispatch({ type: "SET_STATUS", field, status: "danger" });
    } else {
      dispatch({ type: "SET_ERROR", field, error: "" });
      dispatch({ type: "SET_STATUS", field, status: "basic" });
    }
  };

  const validateForm = () => {
    let valid = true;
    (Object.keys(formState) as LoginFieldKey[]).forEach((key) => {
      const value = formState[key].value.trim();

      if (!value) {
        valid = false;
        dispatch({
          type: "SET_ERROR",
          field: key,
          error: `Please enter a ${key}`,
        });
        dispatch({ type: "SET_STATUS", field: key, status: "danger" });
      }
    });
    setIsFormValid(valid);
    return valid;
  };

  const getFormData = () => {
    const payload: Partial<ILogin> = {};
    (Object.keys(formState) as LoginFieldKey[]).forEach((key) => {
      payload[key] = formState[key].value;
    });
    return payload as ILogin;
  };

  const handleLogin = async () => {
    const valid = validateForm();
    if (!valid) return;
    setLoading(true);

    try {
      const formData = getFormData();
      let loginResponse = await login(formData);
      setLoading(false);
      loginDispatch(setLogin(loginResponse.user, loginResponse.token));
      loginDispatch(setIsAuthenticated(true));
    } catch (error) {
      const err = error as Error;
      showErrorToast(err?.message || "Failed to login, please try again");
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate(Routes.FORGOT_PASSWORD);
  };

  const handleRegister = () => {
    navigation.navigate(Routes.REGISTER);
  };

  const toggleVisibility = () => {
    setIsSecure(!isSecure);
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
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
      <CustomInput
        caption={formState.userName.error}
        inputRef={formState.userName.ref}
        isFocus={formState.userName.isFocus}
        label={"Username"}
        size="large"
        nextInputRef={formState.password.ref}
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
        style={styles.forgotPassword}
        onPress={handleForgotPassword}
      >
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={!isFormValid || loading}
        onPress={handleLogin}
        style={[
          styles.loginButton,
          {
            backgroundColor: isFormValid
              ? Colors.default.primary
              : Colors.default.grey,
          },
        ]}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.loginButtonText}>Login</Text>
          {loading && (
            <ActivityIndicator
              style={{ marginLeft: 8 }}
              size="small"
              color={Colors.default.white}
            />
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>Don&apos;t have an account?</Text>
      </TouchableOpacity>
      <Text style={styles.versionText}>{`V${AppVersion.versionNumber} - ${AppVersion.buildNumber}`}</Text>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.default.white,
  },
  logo: {
    width: "100%",
    height: 120,
    marginBottom: 40,
  },
  input: {
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -12,
  },
  forgotText: {
    color: Colors.default.primary,
    fontSize: 12,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: Colors.default.primary,
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: Colors.default.white,
    fontWeight: "600",
    fontSize: 16,
  },
  registerText: {
    alignItems: "center",
    color: Colors.default.primary,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    paddingTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  versionText: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    fontSize: 12,
    color: Colors.default.grey,
  },
});
