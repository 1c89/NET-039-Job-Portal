import { createReducer, on } from '@ngrx/store';
import { AuthState } from 'src/app/_models/appstate';
import { authenticateUserActions } from './authenticate.actions';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  errorMessage: null,
};

export const authenticateReducer = createReducer(
  initialState,
  on(authenticateUserActions.loginSuccess, (state, { authResponse }) => {
    console.log(authResponse);
    console.log(state);
    return {
      ...state,
      isAuthenticated: true,
      user: authResponse.email,
      token: authResponse.token,
      errorMessage: null,
    };
  }),

  on(authenticateUserActions.loginError, (state, { errorMessage }) => ({
    ...state,
    isAuthenticated: false,
    user: '',
    token: '',
    errorMessage: errorMessage,
  })),

  on(authenticateUserActions.logOut, (state) => ({
    ...state,
    isAuthenticated: false,
    user: '',
    token: '',
    errorMessage: null,
  }))
);
