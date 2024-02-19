import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/_models/user';
import { logInUser } from '../actions/authenticate.actions';

export interface AuthState {
    isAuthenticated:boolean,
    user:User | null,
    errorMessage:string | null
}

export const initialState:AuthState = {
    isAuthenticated:false,
    user:null,
    errorMessage:null,
}
export  const logInReducer = createReducer(initialState,
    on(logInUser, (_state, {credentials})=> credentials)

);