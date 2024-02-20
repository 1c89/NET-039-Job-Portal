import { AuthenticateService } from '../../_services/authenticate.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authenticateUserActions } from './authenticate.actions';
import { LoginCredentials } from 'src/app/_models/login-credentials';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { AuthResponse } from 'src/app/_models/user';

@Injectable()
export class AuthenticateEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthenticateService,
    private router:Router
  ) {}

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticateUserActions.logIn),
      switchMap(({ credentials }) =>
        this.authService.logIn(credentials.email, credentials.password).pipe(
          map((user) => {
            console.log(user);
            return authenticateUserActions.loginSuccess({authResponse:{token: user.token, email: credentials.email}});
          }),
          catchError((err) => of(authenticateUserActions.loginError({errorMessage:err.message ?? ""})))
        )
      )
    )
  );

  loginSuccess$ = createEffect(()=> 
  //   this.actions$.pipe(
  //     ofType(authenticateUserActions.loginSuccess),
  //     tap((user)=>{this.router.navigate(["/home"])})
  //   ),{ dispatch: false }
  // );
  {
    return this.actions$.pipe(
      ofType(authenticateUserActions.loginSuccess),
      exhaustMap((response) => { 
        localStorage.setItem('token', response.authResponse.token);
        return this.router.navigate(['home'])})
    );
  },
  { dispatch: false }
  );
}
