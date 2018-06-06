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
    birthDate: '1992-04-17',
    issueDate: '1991-03-12'
  }

  genders : any ;

  formPerson: FormGroup;
  controlName: FormControl;
  controlLastName: FormControl;
  controlEmail: FormControl;
  controlNumberDocument: FormControl;
  controlMatchNumberDocument: FormControl;
  controlGender: FormControl;
  controlBirthDate: FormControl;
  controlIssueDate: FormControl;
  

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
      controlBirthDate:this.controlBirthDate,
      controlIssueDate:this.controlIssueDate
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
    this.controlIssueDate = new FormControl(this.person.issueDate);
    this.controlBirthDate = new FormControl(this.person.birthDate);    
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
    this.controlIssueDate.setValidators([
      Validators.required,
      Validators.nullValidator,
      CustomValidator.mindate(this.controlBirthDate)
    ]);
    this.controlBirthDate.setValidators([
      Validators.required,
      Validators.nullValidator,
      CustomValidator.maxdate(this.controlIssueDate)     
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
