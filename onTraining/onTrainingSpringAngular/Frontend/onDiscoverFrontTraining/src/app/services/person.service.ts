import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Person } from '../models/person';
import { HttpHeaders } from '@angular/common/http';
import { Pageable } from '../models/pageable';
@Injectable()
export class PersonService {
    httpOptions : any = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    constructor(private http : HttpClient){ }  

    /** It returns a list of person */
    getListPerson(pageable : Pageable){
      return this.http.get('http://localhost:8080/person/get', {
        params: {
          page: pageable.number.toString(),
          size: pageable.size.toString()
        }        
      });
    }
    /** It returns a specific person */
    get(id :number){
      return this.http.get('http://localhost:8080/person/get/'+id);
    }

    /** It saves a person */
    save(person :Person){
      return this.http.post('http://localhost:8080/person/save',person,this.httpOptions);
    }

    /** It deletes a person */
    delete(id :number){
      return this.http.delete('http://localhost:8080/person/delete/'+id);
    }

}
