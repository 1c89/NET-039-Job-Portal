import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-individual-profile',
  templateUrl: './individual-profile.component.html',
  styleUrls: ['./individual-profile.component.css']
})
export class IndividualProfileComponent implements OnInit {

  profileForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  eduDegrees:string[] =["Bc's","Mc's","Phd."];

  ngOnInit(): void {

    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [0, [Validators.min(18),Validators.max(100),]],
      education: this.formBuilder.array([]),
      stackDetails: this.formBuilder.group({
        stack: [''],
        experience: [''],
      }),
      address: this.formBuilder.group({
        addressLine1:['',Validators.required],
        addressLine2:[''],
        city: ['',Validators.required],
        country:['Canada'],
        province: ['Ontario',Validators.required],
        postalCode:['',[Validators.required, Validators.pattern("^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$"
          )]],
        

      }),
    });
  }
  getSection(sectionName:string) : FormGroup
  {
    return this.profileForm.get(sectionName) as FormGroup
  }
  
  getformArray(sectionName:string) 
  {
    return (this.profileForm.get(sectionName) as FormArray)['controls'];
  }
  
  addEducation()  
  {
      let education = this.profileForm.get('education') as FormArray;
      education.push(this.formBuilder.group({
        startDate : ['',Validators.required],
        endDate : [''],
        school:[''],
        degree: [''],
        major: ['']

      }));
    }
    removeEducation(index:number)  
    {
        let education = this.getformArray('education').splice(index,1);

     }
  onSubmit() {
    console.log(this.profileForm.value);


  }

}
