import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/_models/appstate';
import { authenticateUserActions } from 'src/app/_store/authenticate/authenticate.actions';
import { selectAuthenticatedSlice } from 'src/app/_store/authenticate/authenticate.selectors';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private store:Store<AuthState>, private router:Router) { }
  auth$!:Observable<AuthState>;

  ngOnInit(): void {
    this.auth$ = this. store.select(selectAuthenticatedSlice);

  }

  logout(){
    this.store.dispatch(authenticateUserActions.logOut());
    this.router.navigate(["home"]);
  }

}
