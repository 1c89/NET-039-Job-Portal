import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_shared/login/login.component';
import { SignupComponent } from './_shared/signup/signup.component';
import { IndividualProfileComponent } from './_components/individual-profile/individual-profile.component';
import { ProfileComponent } from './_shared/profile/profile.component';
import { UserCredentialsComponent } from './_shared/user-credentials/user-credentials.component';

const routes: Routes = [
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'sign-up', component:SignupComponent},
  {path:'profile', component:ProfileComponent,
  children: [
    { path: "", redirectTo: "personal", pathMatch: "full" },
    { path: "personal", component: IndividualProfileComponent },
    { path: "credentials", component: UserCredentialsComponent },]
    
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
