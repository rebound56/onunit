import { Component, OnInit } from '@angular/core';
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
   id : number;
   
   /** This boolean variable determines if view is ready */
   ready: boolean = false;

  constructor(private personService :PersonService, private route: ActivatedRoute, private toasterService : ToasterService) { 
    this.id = this.route.snapshot.params["id"];
  }

  ngOnInit() { }
  
}
