import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginCredentials } from "src/app/_models/login-credentials";
import { AuthResponse, User } from "src/app/_models/user";

export const authenticateUserActions = createActionGroup({
    source: 'Authenticate User',
    events : {
        'Log In': props<{credentials:LoginCredentials}>(),
        'Log Out': emptyProps(),
        'Login Success': props<{authResponse:any}>(),
        'Login Error': props<({errorMessage:string})>(),
        'Sign Up': props<{credentials:LoginCredentials}>(),
    }
});

