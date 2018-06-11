import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import {ToasterService} from 'angular5-toaster';
import { HttpErrorResponse } from '@angular/common/http';
import { Pageable } from '../../models/pageable';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit {
  pageable : Pageable;

  constructor(private personService: PersonService, private toasterService : ToasterService) { 
    this.setPageable({});
  }

  ngOnInit() {    
    this.getList();
  }
  /** initializes pageable and suscribe the event when it has a change */
  setPageable(object : any){
    this.pageable = new Pageable(object);
    this.pageable.onStateChanged().subscribe((data)=> {
      this.getList();
    })
  }

  /** it gets the list of person */
  getList(){
    this.personService.getListPerson(this.pageable)
    .subscribe(
      (result : any)=>{
        this.setPageable(result);        
      }, 
      (error :HttpErrorResponse) => {        
        this.toasterService.pop('error', "Error", 'It is not possible to load the list of person');
        console.log("ERROR "+error)          
    });
  }

  /** It deletes a person */
  delete(id :number){
    if(confirm('Are you sure you want to delete this person?')){
      this.personService.delete(id).subscribe((result) => {
        this.getList();
        alert("Person has been deleted");
      }, (error) => {
        alert("Error to try delete person");
        console.log("error: ", error);
      })
    }
  }
}
