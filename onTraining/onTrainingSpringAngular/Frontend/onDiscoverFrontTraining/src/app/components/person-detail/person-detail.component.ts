import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute } from '@angular/router';
import { NumberUtil } from '../../utils/number-util';
import { Person } from '../../models/person';
import { HttpResponse } from '@angular/common/http/src/response';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  /** This person variable stores the person */
  person : Person;
  /** This variable stores the image photo */
  photo: any;
  /** This boolean variable determines if view is ready */
  ready: boolean = false;

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
          this.ready=true;
          this.personService.getPhoto(this.person.id).subscribe((response : any) =>{
              if(response.status = 200){
                let reader = new FileReader();
                reader.addEventListener("load", () => {
                  this.photo = reader.result;
                }, false);
                if(response.body){
                  reader.readAsDataURL(response.body);
                }

              }
            
          }, (error) => {
            console.log(error)
          });
        }, (error) => {

        });
      }else{

      }
    }else{

    }
  }

}
