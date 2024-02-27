import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyProfileComponent } from './_components/company-profile/company-profile.component';
import { CompanyJobPostingsComponent } from './_components/company-job-postings/company-job-postings.component';

const routes: Routes = [{path:'',component:CompanyProfileComponent, pathMatch:'full'},
                        {path:'jobs',component:CompanyJobPostingsComponent,},
                        ];  


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyProfileRoutingModule { }
