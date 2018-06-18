import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Pageable } from '../models/pageable';
import { Person } from '../models/person';


@Injectable()
export class PersonService {

  constructor(private http : HttpClient) { }
  
  /** This method get person page */
  getAll(pageable: Pageable){
    let options: any = {};
    if(pageable!=undefined && pageable.size!=undefined && pageable.number!=undefined)
      options.params = { page: pageable.number.toString(), size: pageable.size.toString()   };
    return this.http.get('http://localhost:8080/person/get/all',options);
  }


  /** This method returns a specific person */
  get(id :number){
    return this.http.get('http://localhost:8080/person/get/'+id);
  }

  /** This method saves a person */
  save(person :Person){
    return this.http.post('http://localhost:8080/person/save',person,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    );
  }
  
  /** This method deletes a person */
  delete(id :number){
    return this.http.delete('http://localhost:8080/person/delete/'+id);
  }

}
