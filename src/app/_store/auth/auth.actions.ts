import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ILoginCredentials, LoginCredentials } from "src/app/_models/login-credentials";
import { User } from "src/app/_models/user";


export const authUserActions = createActionGroup(
    {
        source:'Authentication',
        events:{
            'Authenticated': props<{user:User}>(),
            'Error': props<{payload?:any}>(),
            'Login Attempt': props<{credentials:LoginCredentials}>(),            
            'Registration Attempt': props<{credentials:LoginCredentials, companyProfile:boolean}>(), 
            'Registration Success': props<{user:User}>(), 

            'Get User': emptyProps(),
            'Logout': emptyProps(),
            'Not Authenticated': emptyProps(),
            'ReFresh Token': emptyProps(),
            'Reset State':emptyProps()

        }      
    }

);