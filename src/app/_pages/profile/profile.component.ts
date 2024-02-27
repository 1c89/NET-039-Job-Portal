import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State as AuthState, authFeature } from 'src/app/_store/auth/auth.state';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  constructor(private store:Store<AuthState>) { }
  user$ = this.store.select(authFeature.selectUser);

  ngOnInit(): void {
  }

}
