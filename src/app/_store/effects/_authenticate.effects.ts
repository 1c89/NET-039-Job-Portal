import { AuthenticateService } from '../../_services/authenticate.service';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';

@Injectable()
export class AuthenticateEffects{
    constructor(private actions:Actions, private autService:AuthenticateService, private router:Router ){

    }

} 
