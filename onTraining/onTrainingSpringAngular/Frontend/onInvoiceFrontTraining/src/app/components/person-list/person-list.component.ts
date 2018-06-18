import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
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

  constructor(private personService : PersonService, private toasterService : ToasterService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  /** this initializes person */
  initList(pageable : Pageable){    
    this.pageable = pageable;
    this.cdr.detectChanges();
    this.personService.getAll(this.pageable).subscribe((result :any) =>{      
      this.pageable = new Pageable(result);
      this.ready= true;
    }, (error) => {
      this.toasterService.pop('error', "Error", 'It was not possible to list person');
    })
  }
}
