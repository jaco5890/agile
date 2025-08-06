import React from "react";
import { FieldState, FormState } from "../types/userForm.types";

const initField = (): FieldState => ({
  value: "",
  error: "",
  status: "basic",
  isFocus: false,
  ref: React.createRef(),
});

export const userInformationInitialFormState: FormState = {
  firstName: initField(),
  lastName: initField(),
  userName: initField(),
  email: initField(),
  password: initField(),
};
