import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {

  constructor(private http:HttpClient) {

   }

   logIn(username:string, password:string) : Observable<any> {
      return this.http.post<User>(environment.apiUrl +'/users/authenticate',{username, password}) 

   } 
}
