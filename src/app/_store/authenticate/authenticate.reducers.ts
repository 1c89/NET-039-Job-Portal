import { AuthState } from 'src/app/_models/appstate';



export const initialState:AuthState = {
    isAuthenticated:false,
    user:null,
    errorMessage:null,
}
// export  const logInReducer = createReducer(initialState,
//     on(logInUser, (_state, {credentials})=> credentials)

// );