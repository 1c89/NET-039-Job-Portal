import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { State as AuthState, authFeature } from '../_store/auth/auth.state';


@Injectable({
  providedIn: 'root'
})
export class IsloggedInGuard implements CanActivate {
  
  constructor (private store:Store<AuthState>, private router:Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let loggedIn:boolean = false; 
      
      this.store.select(authFeature.selectLoggedIn).subscribe(p=>loggedIn = p);

       if (!loggedIn) this.router.navigate(['/']);
       console.log(loggedIn);
      
       return loggedIn;
 
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
