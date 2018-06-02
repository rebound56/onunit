import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { CustomValidator } from '../../utils/custom-validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../utils/form-util';


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
    gender: '',
    birthdate: '1992-04-17',
    issuedate: '1991-03-12'
  }

  genders : any ;

  formPerson: FormGroup;
  controlName: FormControl;
  controlLastName: FormControl;
  controlEmail: FormControl;
  controlNumberDocument: FormControl;
  controlMatchNumberDocument: FormControl;
  controlGender: FormControl;
  controlBirthdate: FormControl;
  controlIssuedate: FormControl;
  

  constructor() {
    this.genders = [
      {value: '', label: '-- Select option'},
      {value: 'M', label: 'Male'},
      {value: 'F', label: 'Female'},
    ]
  }

  ngOnInit() {
        
    this.initControls();
    this.formPerson = new FormGroup({
      controlName:this.controlName,
      controlLastName:this.controlLastName,
      controlEmail:this.controlEmail,
      controlNumberDocument:this.controlNumberDocument,
      controlMatchNumberDocument: this.controlMatchNumberDocument,
      controlGender:this.controlGender,
      controlBirthdate:this.controlBirthdate,
      controlIssuedate:this.controlIssuedate
    })    
  }

  initControls(){
    // initializing every control
    this.controlName = new FormControl(this.person.name);
    this.controlLastName = new FormControl(this.person.lastName);
    this.controlEmail = new FormControl(this.person.email);
    this.controlNumberDocument = new FormControl(this.person.numberDocument);
    this.controlGender = new FormControl(this.person.gender);
    this.controlMatchNumberDocument= new FormControl('');
    this.controlIssuedate = new FormControl(this.person.issuedate);
    this.controlBirthdate = new FormControl(this.person.birthdate);    
    // setting validators
    this.controlName.setValidators([ 
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)
    ]);
    this.controlLastName.setValidators([ 
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200)
    ]);
    this.controlEmail.setValidators([ 
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(150),
      Validators.email
    ]);
    this.controlNumberDocument.setValidators([ 
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),      
    ]);
    this.controlGender.setValidators([ 
      Validators.required        
    ]);
    this.controlMatchNumberDocument.setValidators([
      CustomValidator.match(this.controlNumberDocument)       
    ]);
    this.controlIssuedate.setValidators([
      Validators.required,
      Validators.nullValidator,
      CustomValidator.mindate(this.controlBirthdate)
    ]);
    this.controlBirthdate.setValidators([
      Validators.required,
      Validators.nullValidator,
      CustomValidator.maxdate(this.controlIssuedate)     
    ]);
  }

  save () {
    if(this.formPerson.valid){
      console.log(this.person)
    }else{
      FormUtil.validateFormFields(this.formPerson);
    }
  }
  
  hasErrors(formControl : FormControl){
    return FormUtil.hasErrors(formControl);
  } 

  hasError(formControl : FormControl, error?:string){
    return FormUtil.hasError(formControl,error);
  } 

}
