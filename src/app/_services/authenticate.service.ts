import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from 'src/app/_models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticateService {

  readonly BASE_URL:string = environment.apiUrl;
  
  constructor(private http:HttpClient) {

   }
  getToken(){
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/login`;
    console.log('url:',url);
    return this.http.post<AuthResponse>(url, {email, password});
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, {email, password});
  }
}
