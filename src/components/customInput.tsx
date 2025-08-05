import React from "react";
import { ImageProps, Keyboard, Platform, TextStyle, View } from "react-native";
import {
  Input,
  Text,
  StyleService,
  useStyleSheet,
  TextProps,
} from "@ui-kitten/components";
import { Colors } from "../constants";

export const CustomInput = (props: any): React.ReactElement => {
  const {
    caption,
    rightIcon,
    leftIcon,
    isFocus,
    inputRef,
    keyboardType,
    label,
    maxLength,
    nextInputRef,
    onInputBlur,
    onInputChangeText,
    onInputFocus,
    placeholder,
    returnKeyType,
    status,
    secureTextEntry,
    style,
    textContentType,
    value,
    autoFocus = false,
    size,
    disabled = false,
    multiline = false,
  } = props;

  const styles = useStyleSheet(themedStyles);

  const renderCaption = (): React.ReactElement => {
    return <Text style={styles.errorMessage as TextStyle}>{caption}</Text>;
  };

  const renderRightIcon = (): React.ReactElement => {
    return <View style={styles.rightIcon as ImageProps}>{rightIcon}</View>;
  };

  return (
    <Input
      autoCapitalize="none"
      autoFocus={autoFocus}
      caption={renderCaption}
      keyboardType={keyboardType}
      maxLength={maxLength}
      label={(evaProps: TextProps) => (
        <Text
          {...evaProps}
          style={
            isFocus
              ? status === "basic"
                ? (styles.focusInputLabelStyleIsFocus as TextStyle)
                : (styles.focusInputLabelStyleError as TextStyle)
              : status === "basic"
              ? (styles.basic as TextStyle)
              : (styles.focusInputLabelStyleIsNotFocus as TextStyle)
          }
        >
          {label}
        </Text>
      )}
      size={size}
      onBlur={() => onInputBlur(false)}
      onChangeText={(text) => onInputChangeText(text)}
      accessoryLeft={leftIcon}
      accessoryRight={renderRightIcon}
      onFocus={() => onInputFocus(true)}
      onSubmitEditing={() => {
        if (returnKeyType === "next") {
          if (nextInputRef?.current) {
            nextInputRef?.current?.focus();
          }
        } else {
          Keyboard.dismiss();
        }
      }}
      placeholder={placeholder}
      ref={inputRef}
      returnKeyType={returnKeyType}
      secureTextEntry={secureTextEntry}
      selectionColor={isFocus ? Colors.default.dark : undefined}
      status={status}
      multiline={multiline}
      style={
        isFocus
          ? status === "basic"
            ? [styles.focusInputStyle, style]
            : [styles.focusInputSyleError, style]
          : status === "basic"
          ? [styles.inputSyle, style]
          : [styles.inputSyleError, style]
      }
      textContentType={textContentType}
      value={value}
      disabled={disabled}
    />
  );
};

const themedStyles = StyleService.create({
  inputSyle: {
    borderColor: Colors.default.inputBorder,
    backgroundColor: Colors.default.white,
    borderRadius: 8,
  },
  inputSyleError: {
    borderColor: Colors.default.red,
    backgroundColor: Colors.default.white,
    borderWidth: 2,
    borderRadius: 8,
  },
  focusInputStyle: {
    borderColor: Colors.default.primary,
    borderWidth: 2,
    backgroundColor: Colors.default.white,
    borderRadius: 8,
  },
  focusInputSyleError: {
    borderColor: Colors.default.red,
    backgroundColor: Colors.default.white,
    borderWidth: 2,
    borderRadius: 8,
  },
  focusInputLabelStyleIsFocus: {
    color: Colors.default.primary,
    fontSize: 13,
    paddingBottom: 8,
  },
  focusInputLabelStyleError: {
    color: Colors.default.red,
    fontSize: 13,
    paddingBottom: 8,
  },
  focusInputLabelStyleIsNotFocus: {
    color: Colors.default.red,
    fontSize: 13,
    paddingBottom: 8,
  },
  basic: {
    color: Colors.default.primary,
    fontSize: 13,
    paddingBottom: 8,
  },
  errorMessage: {
    fontSize: 13,
    paddingTop: 8,
    color: Colors.default.red,
  },
  rightIcon: {
    paddingRight: 0,
    marginRight: 0,
  },
});
