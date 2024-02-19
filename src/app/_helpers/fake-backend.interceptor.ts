import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { User } from 'src/app/_models/user';
import { of,Observable, delay } from 'rxjs';
import { error } from 'console';

let users:User[] = [{id: "1", firstName: 'John', lastName: 'Doe', username: 'test', password: 'test', email:"a@a.com" }];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute() {
        switch (true) {
            case url.endsWith('/users/authenticate') && method === 'POST':
                return authenticate();
            default:
                // pass through any requests not handled above
                return next.handle(request);
        }    
    }

    function authenticate(){
      const {username, password} = body;
      const user = users.find(cred => cred.username === username && cred.password === password);
      if(!user) return error('User name or password is incorrect');
      return ok({...userDetails(user), token: 'fake-token'});  
    }

    function ok(body?:any)
    {
      return of(new HttpResponse({status:200, body})).pipe(delay(500));

    }

    function error(message: string) {
    
      return of(new HttpResponse({status:404, body:{error:{message}}})).pipe(delay(500))
    //   throwError(() => ({ error: { message } }))
    //       .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }
    function userDetails(user:any){
      const {id, firstName, lastName, username} = user;
      return {id, firstName, lastName, username};
    }
    
  }
  
}
export const FakeBackendProvider =
{
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
}
