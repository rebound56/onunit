import { Component, OnInit, Input } from '@angular/core';
import { Pageable } from '../../models/pageable';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  @Input() pageable : Pageable;
  @Input() title: string;
  
  constructor() { }

  ngOnInit() {
  }

}
