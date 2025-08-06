import { LoginAction, LoginFormState } from "../types/loginForm.types";

export const loginFormReducer = (
  state: LoginFormState,
  action: LoginAction
): LoginFormState => {
  const { field } = action;

  switch (action.type) {
    case "SET_VALUE":
      return { ...state, [field]: { ...state[field], value: action.value } };
    case "SET_ERROR":
      return { ...state, [field]: { ...state[field], error: action.error } };
    case "SET_STATUS":
      return { ...state, [field]: { ...state[field], status: action.status } };
    case "SET_FOCUS":
      return {
        ...state,
        [field]: { ...state[field], isFocus: action.isFocus },
      };
    default:
      return state;
  }
};
