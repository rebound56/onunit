import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { ToasterService } from 'angular5-toaster';
import { Person } from '../../models/person';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { NumberUtil } from '../../utils/number-util';
import { FormUtil } from '../../utils/form-util';
import { CustomValidator } from '../../utils/custom-validator';


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  /** person variable */
  person: Person;
  
  /** list genders */
  genders : any;

  /** boolean variable to determine if form is ready */
  ready : boolean = false;

  /** form variables  */
  formPerson : FormGroup;
  controlName : FormControl;
  controlLastName : FormControl;
  controlEmail : FormControl;
  controlPhone: FormControl;
  controlNumberDocument: FormControl;
  controlGender : FormControl;


  constructor(private personService :PersonService, private toasterService: ToasterService, 
      private router : Router, private activatedRoute : ActivatedRoute) {  
  }

  /** This method initializes the lists of the component */
  initLists(){
    this.genders = [
      {value: '', label: '-- Select option'},
      {value: 'M', label: 'Male'},
      {value: 'F', label: 'Female'},
    ];
  }

  /** This method initializes the person */
  initPerson(){
    let id = this.activatedRoute.snapshot.params["id"];
    if(id == undefined)
      this.initForm(new Person()); 
    else if(!NumberUtil.isNumber(id))   
      this.toasterService.pop('error', "Error", 'ID person is incorrect');
    else {
      this.personService.get(id).subscribe((result :Person )=>{          
          this.initForm(result);        
      }, (error :HttpErrorResponse) => {
        if(error.status == 404)
          return this.toasterService.pop('error', "Error", 'The person has not been found');
        return this.toasterService.pop('error', "Error", 'It was not possible to load the person');               
      });
    }
  }

  /** This method initializes the form */
  initForm(person : Person){
    this.person = person;
    // initialize controls
    this.controlName = new FormControl(this.person.name);
    this.controlLastName = new FormControl(this.person.lastName);
    this.controlEmail = new FormControl(this.person.email);
    this.controlNumberDocument = new FormControl(this.person.numberDocument);
    this.controlGender = new FormControl(this.person.gender);
    this.controlPhone= new FormControl(this.person.phone);
    
    // setting validators
    this.controlName.setValidators([ 
      Validators.required,      
      Validators.maxLength(150)
    ]);
    this.controlLastName.setValidators([ 
      Validators.required,      
      Validators.maxLength(200)
    ]);
    this.controlEmail.setValidators([ 
      Validators.required,
      Validators.maxLength(150),
      Validators.email
    ]);
    this.controlNumberDocument.setValidators([ 
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      CustomValidator.number()
    ]);
    this.controlPhone.setValidators([ 
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      CustomValidator.number()
    ]);
    this.controlGender.setValidators([ 
      Validators.required        
    ]);
    
    // add controls to form
    this.formPerson = new FormGroup({
      controlName:this.controlName,
      controlLastName:this.controlLastName,
      controlEmail:this.controlEmail,
      controlNumberDocument:this.controlNumberDocument,      
      controlGender:this.controlGender,
      controlPhone:this.controlPhone,
    });
    // set form prepared as true
    this.ready = true;
  }

  /** This method saves person */
  save () {    
    if(!this.formPerson.valid)
      FormUtil.validateFormFields(this.formPerson);
    else{
      this.personService.save(this.person).subscribe((result : any)=> {        
          this.toasterService.pop('success', 'Person saved', 'The person has been saved successfully');
          this.router.navigate(['/person/detail/'+result.id]);        
      }, (error) =>{
        this.toasterService.pop('error', "Error", 'It was not possible to save the person');
      });
    }
  }
  
  /** This methods returns a boolean if the control has any error */
  hasErrors(formControl : FormControl){
    return FormUtil.hasErrors(formControl);
  } 
  /** This methods returns a boolean if the control has a specific error */
  hasError(formControl : FormControl, error:string){
    return FormUtil.hasError(formControl,error);
  } 


  ngOnInit() {
    this.initLists();
    this.initPerson();
  }

  

}
