import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IndividualProfileRoutingModule } from './individual-profile-routing.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { IndividualProfileComponent } from './_components/individual-profile/individual-profile.component';


@NgModule({
  declarations: [IndividualProfileComponent,
  ],
  imports: [
    CommonModule,
    IndividualProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class IndividualProfileModule { }
