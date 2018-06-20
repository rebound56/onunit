import { Component, OnInit, Input } from '@angular/core';
import { Pageable } from '../../models/pageable';

@Component({
  selector: 'app-person-invoice-list',
  templateUrl: './person-invoice-list.component.html',
  styleUrls: ['./person-invoice-list.component.css']
})
export class PersonInvoiceListComponent implements OnInit {
  
  @Input() public id:number;
  pageable : Pageable;
  ready : boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

  initList(pageable :Pageable){
    setTimeout(() => {
      this.pageable = pageable;
      this.ready = true;
    });    
  }
}
