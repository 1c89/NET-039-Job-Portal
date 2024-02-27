import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authUserActions } from 'src/app/_store/auth/auth.actions';
import { authFeature,  State as AuthState } from 'src/app/_store/auth/auth.state';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private store:Store<AuthState>) { }
  loggedIn$ = this.store.select(authFeature.selectLoggedIn);
  user$ = this.store.select(authFeature.selectUser);

  ngOnInit(): void {
  }

  logout(){
    this.store.dispatch(authUserActions.logout());
   }

}
