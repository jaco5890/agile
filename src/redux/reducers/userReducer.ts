import { createAction, createReducer } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IUser } from "../../interfaces";

type UserState = {
  userInformation: IUser;
  token: string;
};

type UserInformation = IUser;

const initialState: UserState = {
  userInformation: {
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
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
