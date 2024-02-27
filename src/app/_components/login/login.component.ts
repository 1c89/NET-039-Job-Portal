import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/_helpers/base-form-component';
import {authFeature,  State as AuthState } from 'src/app/_store/auth/auth.state';
import { authUserActions } from 'src/app/_store/auth/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseFormComponent implements OnInit {

  loginForm!: FormGroup;

  auth$ = this. store.select(authFeature.selectAuthFeatureState); 
  errorMessage$ = this.store.select(authFeature.selectError)

  constructor(private store: Store<AuthState>) {
    super();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      remember: new FormControl(false),
    });

  }

  onSubmit() {
    const { email, password, remember } = this.loginForm.value;

    const loginData = {credentials: { email, password, remember }};
    this.store.dispatch(authUserActions.loginAttempt(loginData));
    
    this.loginForm.reset();
  }
  
 override get thisForm() :FormGroup{
      return this.loginForm 
  } 

  onEmailChange() {
    this.store.dispatch(authUserActions.resetState());
  }

}
