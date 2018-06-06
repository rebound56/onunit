import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable()
export class PersonService {

    constructor(private http : HttpClient){

    }
  
    getListPerson(){
      return this.http.get('http://localhost:8080/person/');
    }
    

}
