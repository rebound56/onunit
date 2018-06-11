import {EventEmitter} from '@angular/core';

export class Pageable {
    content : any;
    pageable: any;
    sort: any;
    totalElements: number;
    totalPages : number;
    last : boolean;
    size: number ;
    numberOfElements : number;    
    pageSize: number;   
    first: boolean;
    number: number;

    listSize: any = [5,10,15,20,30];
    listPages : any = [];

    stateChanged: EventEmitter<boolean> = new EventEmitter();
    
    constructor(object : any){
        if(object == undefined || object == null) object = {};
        this.content = object['content'];
        this.pageable = object['pageable'];
        this.sort = object['sort'];
        this.totalElements = object['totalElements'];
        this.totalPages = object['totalPages'];
        this.last = object['last'];
        this.size = object['size'] != undefined ? object['size']: 5;
        this.numberOfElements = object['numberOfElements'];
        this.pageSize = object['pageSize'];
        this.first = object['first'];
        this.number = object['number'] != undefined ? object['number'] : 0 ;

        if(this.totalPages != undefined){
            this.listPages = [];
            for(let i =0; i < this.totalPages; i++){
                let page = {
                    index:i,
                    label:i+1,
                    active: i==this.number
                }
                this.listPages.push(page);
            }
        }
    }
    
    /** It returns a boolean when it is ready */
    isReady(){
        return this.totalElements != undefined && this.numberOfElements != undefined;
    }
    /** It returns a boolean to know if it has previous */
    hasPrev(){
        return this.number != undefined && this.number-1 >= 0;
    }
    /** It returns a boolean to know if it has next */
    hasNext(){
        return this.number != undefined && this.totalPages != undefined && this.number+1 < this.totalPages;
    }
    /** It returns if it is the first */
    isFirst(){
        return this.first != undefined && this.first;
    }    
    /** It returns if it is the first */
    isLast(){
        return this.last != undefined && this.last;
    }

    /** It returns the prev id */
    getPrevIndex(){
        return this.number != undefined ? this.number -1 : -1;
    }

    /** it returns the next id */
    getNextIndex(){
        return this.number != undefined ? this.number +1 : -1;
    }
   
    /**it returns the last id */
    getLastIndex(){
        return this.totalPages != undefined ? this.totalPages -1 : -1;
    }

    /**it returns the last id */
    getFirstIndex(){
        return 0;
    }

    /** it sets a new index and triggers the event when it is done */
    setPage(index : number){
        this.number=index;
        this.emitEvent();    
    }

    /** it emits the event */
    emitEvent(){
        this.stateChanged.emit(true);
    }

    /** other methods can suscriber to listen new events */
    onStateChanged() {
        return this.stateChanged;
    }    
}
