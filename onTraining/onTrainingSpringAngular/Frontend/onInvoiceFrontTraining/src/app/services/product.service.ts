import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

  constructor(private httpClient : HttpClient) { }

  /** This method returns a list of product */
  getAll(){
    return this.httpClient.get('http://localhost:8080/api/product/get/all');
  }

}
