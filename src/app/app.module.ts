import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './_components/nav-bar/nav-bar.component';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_shared/login/login.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './_shared/signup/signup.component';
import { AuthenticateEffects } from './_store/authenticate/_authenticate.effects';
import { authenticateReducer } from './_store/authenticate/authenticate.reducers';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { IndividualProfileComponent } from './_components/individual-profile/individual-profile.component';
import { AddressFormComponent } from './_shared/address-form/address-form.component';
import { ProfileComponent } from './_shared/profile/profile.component';
import { SidebarComponent } from './_shared/sidebar/sidebar.component';
import { UserCredentialsComponent } from './_shared/user-credentials/user-credentials.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FormValidationComponent } from './_shared/form-validation/form-validation.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,

    IndividualProfileComponent,
     AddressFormComponent,
     ProfileComponent,
     SidebarComponent,
     UserCredentialsComponent,
     FormValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,    
    StoreModule.forRoot({
      authencticateState:authenticateReducer,
      },{}),
    EffectsModule.forRoot([AuthenticateEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
