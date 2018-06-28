import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pageable } from '../models/pageable';
import { Invoice } from '../models/invoice';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class InvoiceService {

  constructor(private httpClient : HttpClient) { }

  /** This method gets invoices by person id */
  getByPersonId(id : number, pageable: Pageable){
    let options: any = {};
    if(pageable!=undefined && pageable.size!=undefined && pageable.number!=undefined)
      options.params = { page: pageable.number.toString(), size: pageable.size.toString()   };
    return this.httpClient.get('http://localhost:8080/api/invoice/get/person/'+id,options);
  }

  /** This method deletes an invoice */
  delete(id : number){    
    return this.httpClient.delete('http://localhost:8080/api/invoice/delete/'+id);
  }

  /** This method gets an invoice by id */
  get(id : number){    
    return this.httpClient.get('http://localhost:8080/api/invoice/get/'+id);
  }

  /** This method saves an invoice */
  save(invoice: Invoice){
     return this.httpClient.post('http://localhost:8080/api/invoice/save',invoice,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})}
    );
  }
}
