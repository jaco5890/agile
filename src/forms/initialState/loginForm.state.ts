import React from "react";
import { LoginFieldState, LoginFormState } from "../types/loginForm.types";

const initField = (): LoginFieldState => ({
  value: "",
  error: "",
  status: "basic",
  isFocus: false,
  ref: React.createRef(),
});

export const loginInitialFormState: LoginFormState = {
  userName: initField(),
  password: initField(),
};
