import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/_models/appstate';
import { User } from 'src/app/_models/user';
import { authenticateUserActions } from 'src/app/_store/authenticate/authenticate.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private store:Store<AuthState>) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  
  }

  onSubmit(){
    this.store.dispatch(authenticateUserActions.signUp(this.signupForm.value));
    console.log(this.signupForm.value);
  }
}
