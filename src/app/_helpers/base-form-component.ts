import { FormGroup } from '@angular/forms';
import { IValidationMessage, ValidationMessage } from '../_shared/form-validation/form-validation.component';

export class BaseFormComponent {

  get thisForm(): FormGroup {
    throw new Error('Child components must override `thisForm` getter.');
  }

  validateControl(elementName: string) {
    if (this.thisForm) { 
    const element = this.thisForm.get(elementName)!;
   
    return !element.touched ? '' : element.valid ? 'is-valid' : 'is-invalid';
    }
    return '';
  }

  validationMessage(elementName:string, feedbackText:string[], elementId:string):IValidationMessage
  {
    if(!this.thisForm){
      return new ValidationMessage
    }
    
    const element = this.thisForm.get(elementName)!;
    
    if (feedbackText.length < 2)
    {
      console.log('Not enough data', feedbackText)
      for(let i = feedbackText.length; i < 2; i++)
      {
        feedbackText.push("");
      }
    }
   
    return {
            'isValid':element.valid || false,
            'isTouched':element.touched || false,
            'validFeedbackText':feedbackText[0],
            'invalidFeedbackText':feedbackText[1],
            'elementId':elementId
           }

  }

}