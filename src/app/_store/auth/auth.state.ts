import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/_models/user';
import { authUserActions } from './auth.actions';

export interface State {
  loggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: {
    code: string;
    message: string;
  } | null;
  success: boolean;
}

const initialState: State = {
  loggedIn: false,
  user: null,
  loading: true,
  error: null,
  success: false,
};


 const reducer = createReducer(
  initialState,
  on(authUserActions.getUser, (_state) => ({
    ..._state,
    loading: true,
    success: false,
  })),

  on(authUserActions.notAuthenticated, (_state) => ({
    ..._state,
    ...initialState,
    loading: false,
  })),

  on(authUserActions.resetState, (_state) => ({
    ..._state,
    loading: false,
    error: null,
    success: false,
  })),

  on(authUserActions.loginAttempt, (state) => ({
    ...state,
    loading: true,
    success: false,
  })),

  on(authUserActions.registrationAttempt, (_state) => ({
    ..._state,
    loading: true,
    success: false,
  })),

  on(authUserActions.authenticated, (_state, { user }) => ({
    ..._state,
    user,
    loggedIn: true,
    loading: false,
    error: null,
    success: false,
  })),
  on(authUserActions.registrationSuccess, (_state, { user }) => ({
    ..._state,
    user: user,
    loggedIn: true,
    loading: false,
    success: false,
  })),

  on(authUserActions.error, (_state, { payload }) => ({
    ..._state,
    loading: false,
    success: false,
    error: payload,
  })),
  on(authUserActions.logout, (_state) => ({
    ..._state,
    loading: true,
  }))
);

export const authFeature = createFeature(
    {name:'authFeature', 
      reducer
    }
)

