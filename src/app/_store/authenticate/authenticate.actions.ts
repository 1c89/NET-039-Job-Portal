import { createAction, props } from "@ngrx/store";
import { LoginCredentials } from "src/app/_models/login-credentials";




export const logInUser = createAction('[Authentication] Log In', props<{credentials:LoginCredentials}>());
export const logOutUser = createAction('[Login component] LogOutUser');
