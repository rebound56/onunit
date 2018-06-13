import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Person } from '../models/person';
import { HttpHeaders } from '@angular/common/http';
import { Pageable } from '../models/pageable';
@Injectable()
export class PersonService {


    constructor(private http : HttpClient){ }  

    /** This method returns a list of person */
    getListPerson(pageable : Pageable){
      return this.http.get('http://localhost:8080/person/get/all', {
        params: {
          page: pageable.number.toString(),
          size: pageable.size.toString()
        }        
      });
    }
    /** This method returns a specific person */
    get(id :number){
      return this.http.get('http://localhost:8080/person/get/'+id);
    }

    /** This method returns a photo of a person */
    getPhoto(id:number){
      return this.http.get('http://localhost:8080/person/get/photo/'+id);
    }

    /** This method saves a person */
    save(person :Person){
      return this.http.post('http://localhost:8080/person/save',person,
        {headers: new HttpHeaders({'Content-Type': 'application/json'})}
      );
    }
    /** This method saves photography */
    savePhoto(id :number, photo: File){
      let formData: FormData = new FormData();
      formData.append('photo',photo);
      return this.http.post('http://localhost:8080/person/save/photo/'+id,formData);
    }


    /** This method deletes a person */
    delete(id :number){
      return this.http.delete('http://localhost:8080/person/delete/'+id);
    }

}
