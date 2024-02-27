import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BaseFormComponent } from 'src/app/_helpers/base-form-component';
import { CheckDuplicateEmailService } from 'src/app/_services/check-duplicate-email.service';

import { authUserActions } from 'src/app/_store/auth/auth.actions';
import { State as AuthState, authFeature } from 'src/app/_store/auth/auth.state';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent extends BaseFormComponent implements OnInit {
  signupForm!: FormGroup;
  errorMessage$ = this.store.select(authFeature.selectError);

  constructor( private checkService: CheckDuplicateEmailService, 
             private store: Store<AuthState>) {
    super();
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        [this.checkService.validateEmailDuplicate()]
      ),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      companyProfile: new FormControl(false),
      termsCheck: new FormControl(false, [Validators.requiredTrue]),

    }, { validators: [this.passwordConfirmationMismatch()] }

    );

  }

  onSubmit() {
    const { email, password } = this.signupForm.value;

    const loginData = { credentials: { email, password }, companyProfile: this.signupForm.value.companyProfile};
    this.store.dispatch(authUserActions.registrationAttempt(loginData));

  }

  override get thisForm(): FormGroup {
    return this.signupForm;
  }

  passwordConfirmationMismatch(): ValidatorFn{
    return (control:AbstractControl) : ValidationErrors | null => {
        return control.value.password !== control.value.confirmPassword ? { passwordConfirmationMismatch: true } : null;
      }
  }
}
