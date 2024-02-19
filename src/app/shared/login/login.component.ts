import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginCredentials } from 'src/app/_models/login-credentials';
import { User } from 'src/app/_models/user';
import { logInUser } from 'src/app/_store/actions/authenticate.actions';
import { AppState } from 'src/app/_store/app.states';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;
  user:User = new User();


constructor(
            private store:Store<AppState>,
            private formBuilder: FormBuilder,
            private route: ActivatedRoute,
            private router: Router) { 


    }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      });  
    //   this.form = this.formBuilder.group({
    //     username: ['', Validators.required],
    //     password: ['', Validators.required]
    // });
  }

  get f() { return this.form.controls; }

  onSubmit(){

    const credentials:LoginCredentials = {
      username: this.user.username,
      password: this.user.password
    };
    
    this.store.dispatch(logInUser({credentials}));
  }
}
