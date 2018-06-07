import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit {
  listPerson : any;
  constructor(private personService: PersonService) { 
  }

  ngOnInit() {
    this.listPerson = [];
    this.personService.getListPerson()
      .subscribe(
        (result)=>{
          this.listPerson = result;
        }, 
        (error) => {
          console.log("ERROR "+error)          
      });
  }
}
