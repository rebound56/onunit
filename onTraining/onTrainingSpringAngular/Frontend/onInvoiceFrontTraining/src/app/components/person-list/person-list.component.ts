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

  pageable :Pageable;
  ready : boolean = false;

  constructor(private personService : PersonService, private toasterService : ToasterService) { }

  ngOnInit() {
  }

  /** this initializes person */
  initList(pageable : Pageable){
    setTimeout(() => {   
      this.pageable = pageable; 
      this.personService.getAll(this.pageable).subscribe((result :any) =>{      
        this.pageable = new Pageable(result);
        this.ready= true;
      }, (error) => {
        this.toasterService.pop('error', "Error", 'It was not possible to list person');
      })
    });
  }

  /** This method deletes a person */
  delete(id :number){
    if(confirm('Are you sure you want to delete this person?')){
      this.personService.delete(id).subscribe((result) => {       
        this.toasterService.pop('success', "Person deleted", 'Person has been deleted successfully');
        this.initList(this.pageable)
      }, (error) => {
        this.toasterService.pop('error', "Error", 'It was not possible to delete the person');
      })
    }
  }
}
