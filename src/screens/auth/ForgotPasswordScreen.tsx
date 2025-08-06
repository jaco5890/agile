import React, { useRef, useState } from "react";
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
import { validEmail } from "../../utils/regex";
import { CustomInput } from "../../components/customInput";
import { forgotPassword } from "../../servicesMock/auth.service";
import { IForgotPassword } from "../../interfaces";
import { useToast } from "react-native-toast-notifications";
import { AuthStackNavigationProps } from "../../routing/stacks/AuthStack";
import { Colors, Routes } from "../../constants";

interface Props {
  navigation: AuthStackNavigationProps<typeof Routes.FORGOT_PASSWORD>;
}

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [statusEmail, setStatusEmail] = useState("basic");
  const emailRef: React.RefObject<any> = useRef(null);
  const [isEmailFocus, setIsEmailFocus] = useState(true);

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeTextEmail = (text: any): void => {
    setEmail(text);
    if (text.length === 0) {
      setErrorEmail("Please enter your email");
      setStatusEmail("danger");
      setIsFormValid(false);
    } else if (!validEmail.test(email)) {
      setErrorEmail("Please enter a valid email");
      setStatusEmail("danger");
      setIsFormValid(false);
    } else {
      setErrorEmail("");
      setStatusEmail("basic");
      setIsFormValid(true);
    }
  };

  const validateEmail = () => {
    return email.length > 0 && validEmail.test(email);
  };

  const handleForgotPasswordPressed = async () => {
    if (validateEmail()) {
      try {
        const payload: IForgotPassword = {
          username: email,
        };
        setLoading(true);
        await forgotPassword(payload);
        setLoading(false);
        showSuccessToast("An email will be sent to reset your password");
        navigation.goBack();
      } catch (error) {
        const err = error as Error;
        showErrorToast(
          err?.message || "Failed to reset your password, please try again"
        );
      }
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

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackPress={handleOnBackPressed} title={""} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.registerTitleText}>Reset your password</Text>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="never"
        >
          <CustomInput
            caption={errorEmail}
            icon={""}
            inputRef={emailRef}
            isFocus={isEmailFocus}
            label={"Email"}
            keyboardType={"email-address"}
            size="large"
            nextInputRef={emailRef}
            onInputBlur={() => setIsEmailFocus(false)}
            onInputChangeText={(text: any) => onChangeTextEmail(text)}
            onInputFocus={() => setIsEmailFocus(true)}
            placeholder={"eg.. user@gmail.com"}
            returnKeyType={"done"}
            status={statusEmail}
            value={email}
          />

          <TouchableOpacity
            disabled={!isFormValid || loading}
            onPress={handleForgotPasswordPressed}
            style={[
              styles.forgotPasswordButton,
              {
                backgroundColor: isFormValid
                  ? Colors.default.primary
                  : Colors.default.grey,
              },
            ]}
          >
            <View style={styles.buttonContainer}>
              <Text style={styles.resetPasswordText}>Submit</Text>
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
  forgotPasswordButton: {
    backgroundColor: Colors.default.primary,
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  resetPasswordText: {
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

export default ForgotPasswordScreen;
