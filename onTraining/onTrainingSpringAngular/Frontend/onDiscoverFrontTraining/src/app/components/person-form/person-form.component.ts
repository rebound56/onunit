import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { ToasterService } from 'angular5-toaster';
import { Person } from '../../models/person';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NumberUtil } from '../../utils/number-util';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomValidator } from '../../utils/custom-validator';
import { FormUtil } from '../../utils/form-util';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  /** This person variable stores the person */
  person : Person;
  /** This array variable stores the list of genders */
  genders : any ; 
  /** This boolean variable determines if form is ready  */
  ready : boolean = false;
  /** This group of variables abstract the FormGroup and its controls */
  formPerson: FormGroup;
  controlName: FormControl;
  controlLastName: FormControl;
  controlEmail: FormControl;
  controlNumberDocument: FormControl;
  controlMatchNumberDocument: FormControl;
  controlGender: FormControl;
  controlBirthDate: FormControl;
  controlIssueDate: FormControl;
  /** This variable stores the state of html element photoInput */
  @ViewChild('photoInput') photoInput;

  constructor(private route : ActivatedRoute, private router : Router,
    private personService : PersonService, private toasterService : ToasterService) { }

  ngOnInit() {
    this.initLists();
    this.initPerson();
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
    let id = this.route.snapshot.params["id"];
    if(id != undefined){
      if(NumberUtil.isNumber(id)){
        this.personService.get(id).subscribe((result :Person )=>{          
          this.initForm(result);        
        }, (error :HttpErrorResponse) => {
          if(error.status == 404){
            this.toasterService.pop('error', "Error", 'The person has not been found');
          }else{
            this.toasterService.pop('error', "Error", 'It was not possible to load the person');
          }          
        });
      }else{
        // id is incorrect
        this.toasterService.pop('error', "Error", 'ID person is incorrect');
      }
    }else{
      // id is not assigned
      this.initForm(new Person());    
    }
  }

  /** This method initializes the form */
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
    this.ready = true; 
  }

  /** This method returns the file from photoInput */
  getPhotoFile() : File {
    let fileInput = this.photoInput.nativeElement;
    if (fileInput.files && fileInput.files[0]) {
      return fileInput.files[0];      
    }
    return null;
  }

  /** This method saves person */
  save () {    
    if(this.formPerson.valid){
      this.personService.save(this.person).subscribe((result : any)=> {
        let photoFile = this.getPhotoFile();
        if(photoFile){
          this.personService.savePhoto(result.id,photoFile).subscribe((resultPhoto) => {
            this.toasterService.pop('success', 'Person saved', 'The person and the photography have been saved successfully');
            this.router.navigate(['/person/form/'+result.id]);
          }, (error)=>{
            this.toasterService.pop('warning', 'Person saved', 'The person has been saved successfully. However, the photography cannot be saved');            
          });          
        }else{
          this.toasterService.pop('success', 'Person saved', 'The person has been saved successfully');
          this.router.navigate(['/person/form/'+result.id]);
        }
      }, (error) =>{
        this.toasterService.pop('error', "Error", 'It was not possible to save the person');
      })
    }else{
      FormUtil.validateFormFields(this.formPerson);
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
}
