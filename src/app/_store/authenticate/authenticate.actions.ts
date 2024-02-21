import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { LoginCredentials } from "src/app/_models/login-credentials";
import { AuthResponse, User } from "src/app/_models/user";

export const authenticateUserActions = createActionGroup({
    source: 'Authenticate User',
    events : {
        'Log In': props<{credentials:LoginCredentials}>(),
        'Log Out': emptyProps(),
        'Logout Error': props<({errorMessage:string|null})>(),
        
        'Login Success': props<{authResponse:any}>(),
        'Login Error': props<({errorMessage:string|null})>(),
        'Clear Error Message': emptyProps(),
        
        'Sign Up': props<{credentials:LoginCredentials}>(),
        'Sign Up Success': emptyProps(),
        'Sign Up Error': props<({errorMessage:string|null})>(),

    }
});

