import { User } from "./user"

export interface AppState{
   authencticateState: AuthState
}

//Features
export interface AuthState {
    isAuthenticated:boolean,
    user: User | null,
    errorMessage:string | null
}