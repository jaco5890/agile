import { combineReducers } from "@reduxjs/toolkit";
import appStateReducer from "./reducers/appStateReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  appState: appStateReducer,
  user: userReducer,
});

export default rootReducer;
