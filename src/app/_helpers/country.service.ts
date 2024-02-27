import { Injectable } from '@angular/core';
import countryData from 'src/assets/countries_full.json'
import countries from 'src/assets/countries.json'
import states from 'src/assets/countries_states.json'

interface State {
  name: string;
  state_code: string;
}

interface Country {
  name: string;
  iso2:string;
  iso3: string;
  states: State[];
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  getCountries_upload(){

    return (countryData as Country[]).map(country => (country.name));
  }
  getCountries_States_upload(){

    return (countryData as Country[]).map(country => ({
      name: country.name,
      iso3: country.iso3,
      iso2: country.iso2,
      states: country.states.map((state)  => ({ name: state.name, state_code: state.state_code }))
  }));

  }
  getCoutries()
  {
    return countries;
  }
  
  getStates(country:string)
  {
    const selectedcountry = states.find(c => (c.name === country))
    if(!selectedcountry)
      return [];

    return selectedcountry.states.map((state)=>(state.name));
  }
}
