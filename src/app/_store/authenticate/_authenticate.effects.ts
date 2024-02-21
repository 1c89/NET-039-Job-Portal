import { AuthenticateService } from '../../_services/authenticate.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authenticateUserActions } from './authenticate.actions';
import { LoginCredentials } from 'src/app/_models/login-credentials';
import { catchError, delay, exhaustMap, from, map, of, switchMap, tap } from 'rxjs';
import { AuthResponse } from 'src/app/_models/user';
import { AuthFirebaseService } from 'src/app/_services/auth-firebase.service';

@Injectable()
export class AuthenticateEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthFirebaseService,
    private router:Router
  ) {}

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticateUserActions.logIn),
      switchMap(({ credentials }) =>
        from(this.authService.login(credentials.email, credentials.password)).pipe(
          map((response) => {
            console.log(response);
            //localStorage.setItem('token', 'true');
            return authenticateUserActions.loginSuccess({authResponse:{token: 'fake-token', email: credentials.email}});
          }),
          catchError((err) => of(authenticateUserActions.loginError({errorMessage:err.message})))
        )
      )
    )
  );

  loginSuccess$ = createEffect(()=> 
   {
    return this.actions$.pipe(
      ofType(authenticateUserActions.loginSuccess),
      exhaustMap((response) => { 
        //localStorage.setItem('token', response.authResponse.token);
        return this.router.navigate(['home'])})
    );
  },
  { dispatch: false }
  );


  loginError$ = createEffect( () =>
      this.actions$.pipe( 
        ofType(authenticateUserActions.loginError), 
        switchMap(()=> of(authenticateUserActions.clearErrorMessage()).pipe(delay(3000))) 
      ),
  );


  signUpEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(authenticateUserActions.signUp),
    switchMap(({ credentials }) =>
      from(this.authService.signup(credentials.email, credentials.password)).pipe(
        map((response) => {
          console.log('Sign up',response);
          return authenticateUserActions.signUpSuccess();
        }),
        catchError((err) => of(authenticateUserActions.signUpError({errorMessage:err.message})))
      )
    )
  )
);

signUpSuccess$ = createEffect(()=> 
{
 return this.actions$.pipe(
   ofType(authenticateUserActions.signUpSuccess),
   exhaustMap(() => { 
    return this.router.navigate(['login'])})
 );
},
{ dispatch: false }
);

logoutEffect$ = createEffect(()=>
  this.actions$.pipe(
   ofType(authenticateUserActions.logOut),
   switchMap(()=>
   from(this.authService.logout()).pipe(
    map((response)=>{
      console.log('Log out',response);
      //   localStorage.removeItem('token');
      return authenticateUserActions.logOut();
    }

    ),
    catchError((err) => of(authenticateUserActions.logoutError({errorMessage:err.message}))) 
   )
   ) 
  ),{ dispatch: false }
);

}
