import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualProfileComponent } from './_components/individual-profile/individual-profile.component';


const routes: Routes = [{path:'',component:IndividualProfileComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualProfileRoutingModule { }
