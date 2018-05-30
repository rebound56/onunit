import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { CustomValidator } from '../../utils/custom-validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person : Person = {
    id:1,
    name:'Mauro',
    lastName: 'German',
    email: 'mauro.german@ondiscover.com',
    numberDocument: '1234567',
    gender: ''
  }

  genders : any ;

  formPerson: FormGroup;
  controlName: FormControl;
  controlLastName: FormControl;
  controlEmail: FormControl;
  controlNumberDocument: FormControl;
  controlMatchNumberDocument: FormControl;
  controlGender: FormControl;
  

  constructor() {
    this.genders = [
      {value: '', label: '-- Select option'},
      {value: 'M', label: 'Male'},
      {value: 'F', label: 'Female'},
    ]
  }

  ngOnInit() {
    // to add new validators
    this.controlName = new FormControl(this.person.name,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)
    ]);
    this.controlLastName = new FormControl(this.person.lastName,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]);
    this.controlEmail = new FormControl(this.person.email,[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(150),
      Validators.email
    ]);
    this.controlNumberDocument = new FormControl(this.person.numberDocument,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      
    ]);
   

    this.controlGender = new FormControl(this.person.gender,[
      Validators.required        
    ]);
    this.controlMatchNumberDocument= new FormControl(this.person.numberDocument,[
      CustomValidator.match(this.controlNumberDocument)       
    ]);

    this.formPerson = new FormGroup({
      controlName:this.controlName,
      controlLastName:this.controlLastName,
      controlEmail:this.controlEmail,
      controlNumberDocument:this.controlNumberDocument,
      controlMatchNumberDocument: this.controlMatchNumberDocument,
      controlGender:this.controlGender
    })   
  }

  save () {
    console.log("save")
  } 

}
