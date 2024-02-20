import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/_models/appstate';
import { LoginCredentials } from 'src/app/_models/login-credentials';
import { User } from 'src/app/_models/user';
import { authenticateUserActions } from 'src/app/_store/authenticate/authenticate.actions';
import { selectAuthenticatedSlice } from 'src/app/_store/authenticate/authenticate.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  auth$!:Observable<AuthState>;
  errorMessage!: string | null;

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
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
  ngOnDestroy(): void {

  }
}
