import { User } from "./user"

export interface AppState{
   authencticateState: AuthState
}

//Features
export interface AuthState {
    isAuthenticated:boolean,
    user: string | null,
    token:string | null,
    errorMessage:string | null
}