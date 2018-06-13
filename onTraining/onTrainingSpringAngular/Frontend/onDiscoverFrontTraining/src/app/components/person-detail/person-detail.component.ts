import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute } from '@angular/router';
import { NumberUtil } from '../../utils/number-util';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  /** This person variable stores the person */
  person : Person;

  constructor(private personService :PersonService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initPerson();
  }

  initPerson(){
    let id = this.route.snapshot.params["id"];
    if(id != null){
      if(NumberUtil.isNumber(id)){
        this.personService.get(id).subscribe((result :Person )=>{      
          this.person = result;
          this.personService.getPhoto(this.person.id).subscribe((resultPhoto :any) =>{
            debugger;
          }, (error) => {

          });
        }, (error) => {

        });
      }else{

      }
    }else{

    }
  }

}
