import { Component, OnInit, Input } from '@angular/core';
export interface IValidationMessage
{
  isValid:boolean,
  isTouched:boolean,
  validFeedbackText:string,
  invalidFeedbackText:string,
  elementId:string
}
@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {
  @Input() feedbackMessage:IValidationMessage= <IValidationMessage>{};
  
  constructor() { }

  ngOnInit(): void {
  }

}
