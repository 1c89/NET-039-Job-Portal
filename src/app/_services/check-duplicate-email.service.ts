import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { Observable, pipe, of, from, map, catchError, debounceTime, switchMap, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckDuplicateEmailService {

  constructor(private fireAuth:AngularFireAuth) { }

   validateEmailDuplicate(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    
      const email = control.value;
      //console.log('TRIG duplicate',);
      const a = from(this.fireAuth.fetchSignInMethodsForEmail(email))
        .pipe(
          map(signInMethods => {
            return signInMethods.length > 0 ? { emailAlreadyExists: true } : null;
          }),
          catchError(() => {
            return of(null);
          })
        );
         
        // Why doesn't work?????
        
        // const a = control.valueChanges.pipe(
        //   debounceTime(500), // Adjust the delay time as needed
        //   switchMap(email =>  { 
        //     console.log(email) ; 
        //     return from(this.fireAuth.fetchSignInMethodsForEmail(email))
        //   .pipe(
        //     map(signInMethods => {
        //       console.log(signInMethods);
        //       console.log('aaa',email);
        //       return signInMethods.length > 0 ? { emailAlreadyExists: true } : null;
        //     }),
        //     catchError(() => {
        //       return of(null);
        //     })
        //   )
        //   })
        //   );
        
        // console.log(a); 
         return a;
    };
  }


}
