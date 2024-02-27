import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authUserActions } from './auth.actions';
import { Observable, catchError, exhaustMap, from, map, of, switchMap, take } from 'rxjs';
import { User } from 'src/app/_models/user';
import { LoginCredentials } from 'src/app/_models/login-credentials';
import { UserCredential } from '@firebase/auth-types';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private fireStore: AngularFirestore,  private fireAuth: AngularFireAuth, private router:Router) {}
    
  getUserEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(authUserActions.getUser),
    exhaustMap(() =>
      this.fireAuth.authState.pipe(
        take(1),
        switchMap((authData) => {
          //console.log(authData);
          if (authData) {
            const user = this.createUserFromAuthData(authData,false);
            return this.getUserProfile(user.uid).pipe(
              map((userProfileSnapshot) => {
                if (userProfileSnapshot.exists) {
                  const userProfileData = userProfileSnapshot.data();
                 // console.log('Firebase get:', userProfileData);
                  user.companyProfile = userProfileData?.companyProfile;
                }
                return authUserActions.authenticated({ user });
              })
            );
          } else {
            return of(authUserActions.notAuthenticated());
          }
        })
      )
    )
  )
);

  loginAttemptEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authUserActions.loginAttempt),
      exhaustMap((p) =>
        from(this.loginWithCredentials(p.credentials)).pipe(
          map(() => authUserActions.getUser()),
          catchError((err) => { 
                console.log(err);
                return of(authUserActions.error({payload:this.handleError(err)}))
            }
          )
        )
      ),
      catchError((err)=>of(authUserActions.error({payload:this.handleError(err)})))         
    )
  );

  logoutEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authUserActions.logout),
      exhaustMap((payload) => {
        return from(this.fireAuth.signOut());
      }),

      map(() => {
        this.router.navigate(['home']);
        return authUserActions.notAuthenticated();
      })
    )
  );

  authenticatedEffect$ = createEffect(() =>
    this.actions$.pipe(
        ofType(authUserActions.authenticated),
        map((response) => { 
            return this.router.navigate(['home'])})
    ), {dispatch:false}
  );

  registerAttemptEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authUserActions.registrationAttempt),
      exhaustMap((p) => {
        return from(this.signUpWithCredentials(p.credentials,)).pipe(
          map((credential) => {

            console.log('SignUpWithCredentials', credential);

            const authData = credential.user;
           
            if (authData) {
              const user = this.createUserFromAuthData(authData, p.companyProfile);
              this.setUserProfile(user.uid,authData.email!,p.companyProfile);

              this.router.navigate(['home']);
              return authUserActions.registrationSuccess({user});
            } 
            else 
            {    console.log('SignUpWithCredentials', 'user is null after sign up', credential);
                return authUserActions.notAuthenticated();
            }
          }),
          catchError((err) => of(authUserActions.error({payload:this.handleError(err)})))
        );
      })
    )
  );


  private handleError(error: any): { code: string; message: string } {
    if (error instanceof FirebaseError) {
       return { code: error.code, message: error.message };
    } else {
        return { code: 'unknown_error', message: 'An error occurred' };
    }
  }


  private loginWithCredentials(
    credentials: LoginCredentials
  ): Promise<UserCredential> {
    const persistenceType = credentials.remember ? 'local' : 'session';
    return this.fireAuth.setPersistence(persistenceType).then(() => {
      return this.fireAuth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );
    })
    .catch((err)=>{ 
        console.log('err in promise',err);
        throw err})
    ; 

}

  private signUpWithCredentials(
    credentials: LoginCredentials
  ): Promise<UserCredential> {
    return this.fireAuth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  private createUserFromAuthData(authData: any, companyProfile:boolean ): User {
    return new User(
      authData.uid,
      authData.displayName ?? '',
      authData.email ?? '',
      companyProfile 
    );
  }
  
  private getUserProfile(uid: string): Observable<any> {
    return this.fireStore.collection('userProfiles').doc(uid).get();
  }
  
  private setUserProfile(uid:any, email:string, companyProfile:boolean)
  {
    this.fireStore.collection('userProfiles').doc(uid).set({email, companyProfile});
  }

  
  
  
  

}

// exhaustMap(credentials => {
//     return from(this.doLoginWithCredentials(credentials)).pipe(
//       map(p => {
//         // successful login
//         return of(userActions.GetUser());
//       }),
//       catchError(error => of(userActions.AuthError(error)))
//     );
//   })
