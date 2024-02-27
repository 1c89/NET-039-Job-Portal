import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyProfileRoutingModule } from './company-profile-routing.module';
import { CompanyProfileComponent } from './_components/company-profile/company-profile.component';
import { CompanyJobPostingsComponent } from './_components/company-job-postings/company-job-postings.component';


@NgModule({
  declarations: [
    CompanyProfileComponent,
    CompanyJobPostingsComponent
  ],
  imports: [
    CommonModule,
    CompanyProfileRoutingModule
  ]
})
export class CompanyProfileModule { }
