import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountryService } from 'src/app/_helpers/country.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  @Input() addressForm!:FormGroup;
  constructor(private countryService:CountryService) { }
  countryList!:string[];
  provinceList!:string[];
  selectedCountry = "";
  selectedProvince = "";

  ngOnInit(): void {
    this.countryList = this.countryService.getCoutries();
    this.selectedCountry = this.addressForm.get('country')?.value;
  
    this.provinceList = this.countryService.getStates(this.selectedCountry);
    this.selectedProvince = this.addressForm.get('province')?.value;
  }

  onCountryChange(event:any){
    this.selectedCountry = event.target.value;
    this.setProvince();
      
  }

  setProvince(){
    this.provinceList = this.countryService.getStates(this.selectedCountry);
    if (!this.provinceList.find(p=>p !== this.selectedProvince)) {
      if (this.provinceList.length > 0) {
        this.selectedProvince = this.provinceList[0]}
      else{
        this.selectedProvince = ""
      }

    }
  }
  onProvinceChange(event:any)
  {
    this.selectedProvince = event.target.value;
  }





}
