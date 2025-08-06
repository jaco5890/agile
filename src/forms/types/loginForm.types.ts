export type LoginFieldKey = "userName" | "password";

export type LoginFieldState = {
  value: string;
  error: string;
  status: "basic" | "danger";
  isFocus: boolean;
  ref: React.RefObject<any>;
};

export type LoginFormState = Record<LoginFieldKey, LoginFieldState>;

export type LoginAction =
  | { type: "SET_VALUE"; field: LoginFieldKey; value: string }
  | { type: "SET_ERROR"; field: LoginFieldKey; error: string }
  | { type: "SET_STATUS"; field: LoginFieldKey; status: "basic" | "danger" }
  | { type: "SET_FOCUS"; field: LoginFieldKey; isFocus: boolean };
