import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State as AuthState, authFeature} from '../_store/auth/auth.state';

@Injectable({
  providedIn: 'root'
})
export class IsCompanyProfileGuard implements CanActivate, CanLoad {
  constructor (private store:Store<AuthState>, private router:Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const companyProfile = this.isCompanyProfile()
       if (!companyProfile) this.router.navigate(['/']);
  
    return companyProfile;
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.isCompanyProfile();
  }

  private isCompanyProfile():boolean{
   
    let companyProfile:boolean = false; 
    const user$ = this.store.select(authFeature.selectUser).subscribe(p=>companyProfile = p?.companyProfile ?? false);
    
    user$.unsubscribe();

    return companyProfile;

  }
}
