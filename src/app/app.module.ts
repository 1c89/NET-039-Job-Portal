import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { JobPostingsGalleryComponent } from './components/job-postings-gallery/job-postings-gallery.component';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployerProfileComponent } from './components/employer-profile/employer-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { FakeBackendProvider } from './_helpers/fake-backend.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticateEffects } from './_store/effects/_authenticate.effects';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    JobPostingsGalleryComponent,
    EmployeeProfileComponent,
    EmployerProfileComponent,
    HomeComponent,
    SearchBarComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,    
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([AuthenticateEffects])
  ],
  providers: [FakeBackendProvider,AuthenticateEffects],
  bootstrap: [AppComponent]
})
export class AppModule { }
