import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';
import { ToasterService } from 'angular5-toaster';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { NumberUtil } from '../../utils/number-util';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

   /** This person variable stores the person */
   person : Person;
   
   /** This boolean variable determines if view is ready */
   ready: boolean = false;

  constructor(private personService :PersonService, private route: ActivatedRoute, private toasterService : ToasterService) { }

  ngOnInit() {
    this.initPerson();
  }

  initPerson(){
    let id = this.route.snapshot.params["id"];
    if(id == null || !NumberUtil.isNumber(id))
      this.toasterService.pop('error', 'Error', 'ID person is incorrect');
    else {
      this.personService.get(id).subscribe((result :Person )=>{      
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
