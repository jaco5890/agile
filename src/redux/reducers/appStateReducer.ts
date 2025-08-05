import { createAction, createReducer } from '@reduxjs/toolkit';
import { RootState } from '../index';

type AppState = {
  isAuthenticated: boolean;
};

const initialState: AppState = {
    isAuthenticated: false,
};

export const setIsAuthenticated = createAction(
  '[APPSTATE] Set Authenticated',
  (authenticated: boolean) => ({
    payload: {
        authenticated,
    },
  }),
);

export const selectIsAuthenticated = (state: RootState): boolean =>
  state.appState.isRunning;

const appStateReducer = createReducer(initialState, builder => {
  builder.addCase(setIsAuthenticated, (state, action) => {
    const { authenticated } = action.payload;
    return {
      ...state,
      authenticated,
    };
  });
});

export default appStateReducer;
