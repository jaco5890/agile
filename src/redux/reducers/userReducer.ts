import { createAction, createReducer } from "@reduxjs/toolkit";
import { RootState } from "../index";

type UserState = {
  userInformation: UserInformation;
  token: string;
};

type UserInformation = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

const initialState: UserState = {
  userInformation: {
    username: "",
    firstName: "",
    lastName: "",
    password: "",
  },
  token: "",
};

export const setLogin = createAction(
  "[USER] Set Login",
  (userInformation: UserInformation, token: string) => ({
    payload: {
      userInformation,
      token,
    },
  })
);

export const selectLogin = (state: RootState): any | undefined => state.user;

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(setLogin, (state, action) => {
    const { userInformation, token } = action.payload;
    return {
      ...state,
      userInformation,
      token,
    };
  });
});

export default userReducer;
