import { Component, OnInit, ViewChild } from '@angular/core';
import { Person } from '../../models/person';
import { CustomValidator } from '../../utils/custom-validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormUtil } from '../../utils/form-util';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { NumberUtil } from '../../utils/number-util';
import { Router } from '@angular/router/';
import {ToasterService} from 'angular5-toaster';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  // person
  person : Person;

  // lists
  genders : any ;  

  // boolean identifies if form is prepared
  formPrepared: boolean = false;

  // form
  formPerson: FormGroup;
  controlName: FormControl;
  controlLastName: FormControl;
  controlEmail: FormControl;
  controlNumberDocument: FormControl;
  controlMatchNumberDocument: FormControl;
  controlGender: FormControl;
  controlBirthDate: FormControl;
  controlIssueDate: FormControl;

  // form-data for image
  @ViewChild('photoInput') photoInput;
  
  constructor(private route : ActivatedRoute, private router : Router,
      private personService : PersonService, private toasterService : ToasterService) {}

  ngOnInit() {    
    this.initLists();
    this.initPerson();
  }

  /** It initializes the lists of the component */
  initLists(){
    this.genders = [
      {value: '', label: '-- Select option'},
      {value: 'M', label: 'Male'},
      {value: 'F', label: 'Female'},
    ]
  }

  /** It initializes the person */
  initPerson(){
    let id = this.route.snapshot.params["id"];
    if(id != undefined){
      if(NumberUtil.isNumber(id)){
        this.personService.get(id).subscribe((result :Person )=>{
          // the service has been succesful        
          this.initForm(result);        
        }, (error :HttpErrorResponse) => {
          if(error.status == 404){
            this.toasterService.pop('error', "Error", 'Person has not been found');
          }else{
            this.toasterService.pop('error', "Error", 'Error to try finding the person');
          }
          
        });
      }else{
        this.toasterService.pop('error', "Error", 'Person has not been found');
      }
    }else{
      // id doesn't exist
      this.initForm(new Person());    
    }
  }
 


  /** It initializes the form */
  initForm(person : Person){    
    // initializes the person
    this.person = person;
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
    // add controls to form
    this.formPerson = new FormGroup({
      controlName:this.controlName,
      controlLastName:this.controlLastName,
      controlEmail:this.controlEmail,
      controlNumberDocument:this.controlNumberDocument,
      controlMatchNumberDocument: this.controlMatchNumberDocument,
      controlGender:this.controlGender,
      controlBirthDate:this.controlBirthDate,
      controlIssueDate:this.controlIssueDate,

    });
    // set form prepared as true
    this.formPrepared = true; 
  }

  /** It returns formdate from photoInput */
  getPhotoData() : File {
    let fileBrowser = this.photoInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      return fileBrowser.files[0];      
    }
    return null;
  }
  
  
  /** It saves person */
  save () {    
    if(this.formPerson.valid){
      this.personService.save(this.person).subscribe((result : any)=> {
        let photoData = this.getPhotoData();
        if(photoData){
          this.personService.savePhoto(result.id,photoData).subscribe((resultPhoto) => {
            this.toasterService.pop('success', 'Person saved', 'The person and the photography have been saved succesful!');
            this.router.navigate(['/person/form/'+result.id]);
          }, (error)=>{
            this.toasterService.pop('warning', 'Person saved', 'The person has been saved but the photography has not');            
          });          
        }else{
          this.toasterService.pop('success', 'Person saved', 'The person has been saved succesful!');
          this.router.navigate(['/person/form/'+result.id]);
        }
      }, (error) =>{
        this.toasterService.pop('error', "Person did not save", 'The person has not been saved');
      })
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
