import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';
import { ToasterService } from 'angular5-toaster';
import { NumberUtil } from '../../utils/number-util';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit {
  @Input() public id : number;

  /** This person variable stores the person */
  person : Person;
   
  /** This boolean variable determines if view is ready */
  ready: boolean = false;

  constructor(private personService : PersonService, private toasterService : ToasterService) { }

  ngOnInit() {
    this.initPerson();
  }

  initPerson(){
    
    if(this.id == null || this.id == undefined || !NumberUtil.isNumber(this.id))
      this.toasterService.pop('error', 'Error', 'ID person is incorrect');
    else {
      this.personService.get(this.id).subscribe((result :Person )=>{      
        this.person = result;
        this.ready=true;       
      }, (error: any) => {
        if(error.status == 404){
          this.toasterService.pop('error', 'Error', 'Person is not found');
        }else{
          this.toasterService.pop('error', 'Error', 'it was not possible to load the person');
        }          
      });
    }
  }
}
