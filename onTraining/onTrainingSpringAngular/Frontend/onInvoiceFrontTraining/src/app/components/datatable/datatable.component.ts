import { Component, OnInit , Output, Input,EventEmitter} from '@angular/core';
import { Pageable } from '../../models/pageable';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  @Output() public onChange : EventEmitter<Pageable> = new EventEmitter();
  @Input() public title : string = '';
  @Input() public pageable : Pageable;

  listSize: any = [5,10,15,20,30];  
  ready : boolean = false;

  constructor() { }

  runOnChange(){   
    if(!this.pageable){
      this.pageable = new Pageable({});
      this.pageable.size = 5;
      this.pageable.number = 0;
    }    
    this.onChange.emit(this.pageable);
    this.ready= true;
  }


  ngOnInit() { 
    this.runOnChange();
  }

  /** It returns a boolean to know if it has previous */
  hasPrev(){
      return this.pageable.number != undefined && this.pageable.number-1 >= 0;
  }
  /** It returns a boolean to know if it has next */
  hasNext(){
      return this.pageable.number != undefined && this.pageable.totalPages != undefined && this.pageable.number+1 < this.pageable.totalPages;
  }
  /** It returns if it is the first */
  isFirst(){
      return this.pageable.first != undefined && this.pageable.first;
  }    
  /** It returns if it is the first */
  isLast(){
      return this.pageable.last != undefined && this.pageable.last;
  }

  /** It returns the prev id */
  getPrevIndex(){
      return this.pageable.number != undefined ? this.pageable.number -1 : -1;
  }

  /** it returns the next id */
  getNextIndex(){
      return this.pageable.number != undefined ? this.pageable.number +1 : -1;
  }

  /**it returns the last id */
  getLastIndex(){
      return this.pageable.totalPages != undefined ? this.pageable.totalPages -1 : -1;
  }

  /**it returns the last id */
  getFirstIndex(){
      return 0;
  }

  /** it sets a new index and triggers the event when it is done */
  setPage(index : number){
      this.pageable.number=index;
      this.runOnChange();   
  }
}
