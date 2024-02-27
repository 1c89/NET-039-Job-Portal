import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { SignupComponent } from './_components/signup/signup.component';
import { ProfileComponent } from './_pages/profile/profile.component';
import { UserCredentialsComponent } from './_shared/user-credentials/user-credentials.component';
import { IsloggedInGuard } from './_helpers/is-loggedin.guard';
import { CompanyProfileComponent } from './_modules/company-profile/_components/company-profile/company-profile.component';
import { IsCompanyProfileGuard } from './_helpers/is-company-profile.guard';
import { IsIndividualProfileGuard } from './_helpers/is-individual-profile.guard';



const routes: Routes = [
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'sign-up', component:SignupComponent,},
  {path:'profile', component:ProfileComponent, 
 
  canActivateChild: [IsloggedInGuard],
   children: [
     { path: "", redirectTo: "credentials", pathMatch: "full" },
     { path: "credentials", component: UserCredentialsComponent},
     { path: "individual", canLoad:[IsIndividualProfileGuard], canActivate:[IsIndividualProfileGuard], loadChildren: () => import('./_modules/individual-profile/individual-profile.module').then(m => m.IndividualProfileModule),  },
     { path: "company", canLoad:[IsCompanyProfileGuard], canActivate:[IsCompanyProfileGuard], loadChildren: () => import('./_modules/company-profile/company-profile.module').then(m => m.CompanyProfileModule),  },

  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
