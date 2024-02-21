import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthFirebaseService {

  constructor(private fireAuth:AngularFireAuth, private router:Router ) { }

  login(email:string, password:string){
      return this.fireAuth.signInWithEmailAndPassword(email, password)
  }

  signup(email:string, password:string){
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
  }

  logout(){
    return this.fireAuth.signOut()
  }
}
