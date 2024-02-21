import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/_helpers/BaseFormComponent';
import { AuthState } from 'src/app/_models/appstate';
import { User } from 'src/app/_models/user';
import { authenticateUserActions } from 'src/app/_store/authenticate/authenticate.actions';
import { selectAuthenticatedSlice } from 'src/app/_store/authenticate/authenticate.selectors';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent extends BaseFormComponent implements OnInit {

  signupForm!: FormGroup;
  auth$!:Observable<AuthState>;
   errorMessage!: string | null;

  constructor(private store:Store<AuthState>) { 
    super(); 
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      termsCheck: new FormControl(false,[Validators.requiredTrue])
    });
    
    this.auth$ = this. store.select(selectAuthenticatedSlice);
    
    this.auth$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    }); 
  }

  onSubmit(){
    const { email, password } = this.signupForm.value;

    const loginData = {credentials: { email, password }};
    this.store.dispatch(authenticateUserActions.signUp(loginData));

    console.log(this.signupForm.value);
  }

  override get thisForm() :FormGroup{
    return this.signupForm 
} 

}
