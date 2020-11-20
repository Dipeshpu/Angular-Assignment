import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {FormArray,FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	control = new FormControl();
  specialty: string[] = ['Dentist (General)', 'Dentist (Pediatric)', 'Dentist (Cosmetic)', 'Plastic Surgeon', 'Ophthalmologist', 'Urologist', 'Dermatologist', 'Cosmetologist'];
  filteredspecialty: Observable<string[]>;


	public user: FormGroup;
	constructor(private fb: FormBuilder, private routers : Router){
	
	}

	get userDetails(): FormArray{
	return this.user.get('userDetails') as FormArray;
	}


  ngOnInit(): void{

  	this.user=this.fb.group({
  	userDetails: this.fb.array([])
  	});

  	this.userDetails.push(this.fb.group({
  	name:['',Validators.required],
  	spe:['',Validators.required]
  	}));

  	this.userDetails.push(this.fb.group({
  	practicename:['',Validators.required],
  	address:['',Validators.required],
  	city:['',Validators.required],
  	state:['',Validators.required],
  	zipcode:['',Validators.compose([Validators.required, Validators.minLength(5)])]
  	}));

  	this.userDetails.push(this.fb.group({
  	fname:['',Validators.required],
  	email:['',Validators.required],
  	cell:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  	}));

this.filteredspecialty = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  
  }
  submitForm(): void{
  if(this.userDetails.valid)
  {
  localStorage.setItem('Details',JSON.stringify(this.userDetails.value));
  
  this.routers.navigate(['']);
  }

  }
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.specialty.filter(specialty_name => this._normalizeValue(specialty_name).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  
  
}
