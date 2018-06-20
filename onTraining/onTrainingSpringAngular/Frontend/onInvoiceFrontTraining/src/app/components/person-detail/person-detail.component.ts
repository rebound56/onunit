import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params["id"];
  }

  ngOnInit() { }
  
}
