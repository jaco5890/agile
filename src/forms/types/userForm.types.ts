export type FieldKey =
  | "firstName"
  | "lastName"
  | "userName"
  | "email"
  | "password";

export type FieldState = {
  value: string;
  error: string;
  status: "basic" | "danger";
  isFocus: boolean;
  ref: React.RefObject<any>;
};

export type FormState = Record<FieldKey, FieldState>;

export type Action =
  | { type: "SET_VALUE"; field: FieldKey; value: string }
  | { type: "SET_ERROR"; field: FieldKey; error: string }
  | { type: "SET_STATUS"; field: FieldKey; status: "basic" | "danger" }
  | { type: "SET_FOCUS"; field: FieldKey; isFocus: boolean };
