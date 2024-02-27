import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFormComponent } from './address-form/address-form.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { UserCredentialsComponent } from './user-credentials/user-credentials.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const sharedComponets = [AddressFormComponent,
  FormValidationComponent,
  UserCredentialsComponent,
  SidebarComponent];


@NgModule({
  declarations: [...sharedComponets],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,RouterModule
  ],
  exports: [...sharedComponets] 
})
export class SharedModule { }
