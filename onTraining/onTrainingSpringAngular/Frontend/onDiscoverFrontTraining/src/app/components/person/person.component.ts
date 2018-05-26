import { Component, OnInit } from '@angular/core';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person : Person = {
    id:1,
    name:'Mauro',
    lastName: 'German',
    email: 'mauro.german@ondiscover.com',
    numberDocument: '1234567'
  }
  constructor() { }

  ngOnInit() {
  }

}
