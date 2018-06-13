import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { ToasterService } from 'angular5-toaster';
import { Pageable } from '../../models/pageable';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  /** This pageable variable manages the pagination of person list   */
  pageable : Pageable;
  /** This boolean variable stores if the component is ready */
  ready : boolean = false;

  constructor(private personService: PersonService, private toasterService : ToasterService) {
    this.pageable = new Pageable({});
  }

  ngOnInit() {
    this.getList();
  }

  /** This method gets the person list */
  getList(){
    this.personService.getListPerson(this.pageable)
    .subscribe(
      (result : any)=>{
        this.setPageable(result);        
      }, 
      (error) => {        
        this.toasterService.pop('error', "Error", 'It was not possible to load the list of person');
        console.log("ERROR "+error)          
    });
  }

  /** This method initializes the pageable variable and suscribe the event when datatable component has a change */
  setPageable(object : any){
    this.pageable = new Pageable(object);
    this.ready=true;
    this.pageable.onStateChanged().subscribe((data)=> {
      this.getList();
    })
  }

  /** This method deletes a person */
  delete(id :number){
    if(confirm('Are you sure you want to delete this person?')){
      this.personService.delete(id).subscribe((result) => {
        this.getList();
        this.toasterService.pop('success', "Person deleted", 'Person has been deleted successfully');
      }, (error) => {
        this.toasterService.pop('error', "Error", 'It was not possible to delete the person');
      })
    }
  }
}
