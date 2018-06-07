import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class PersonService {
    constructor(private http : HttpClient){ }  
    /** It returns a list of person */
    getListPerson(){
      return this.http.get('http://localhost:8080/person/');
    }
    /** It returns a specific person */
    get(id :number){
      return this.http.get('http://localhost:8080/person/'+id);
    }
}
