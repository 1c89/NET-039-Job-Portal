import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgModel,
  Validators,
  
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/_models/appstate';
import { authenticateUserActions } from 'src/app/_store/authenticate/authenticate.actions';
import { selectAuthenticatedSlice } from 'src/app/_store/authenticate/authenticate.selectors';
import { IValidationMessage } from '../form-validation/form-validation.component';
import { BaseFormComponent } from 'src/app/_helpers/BaseFormComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  loginForm!: FormGroup;
  auth$!:Observable<AuthState>;
  errorMessage!: string | null;

  constructor(private store: Store<AuthState>) {
    super();


  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
    this.auth$ = this. store.select(selectAuthenticatedSlice);
    
    this.auth$.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit() {
 
    const { email, password } = this.loginForm.value;

    const loginData = {credentials: { email, password }};
    this.store.dispatch(authenticateUserActions.logIn(loginData));
    console.log(this.loginForm.value);
  }
  
 override get thisForm() :FormGroup{
      return this.loginForm 
  } 

}
