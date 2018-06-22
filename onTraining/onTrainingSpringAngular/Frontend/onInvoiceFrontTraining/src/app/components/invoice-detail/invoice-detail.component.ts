import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { ToasterService } from 'angular5-toaster';
import { ProductService } from '../../services/product.service';
import { Invoice } from '../../models/invoice';
import { NumberUtil } from '../../utils/number-util';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  
  ready :boolean = false;
  invoice : Invoice;
  idPerson : number;
  id : number;
  
  constructor(private personservice :PersonService, private activatedRoute: ActivatedRoute, 
    private invoiceService: InvoiceService, private toasterService : ToasterService, 
    private productService : ProductService) {
      this.idPerson = this.activatedRoute.snapshot.params["idPerson"];
      this.id = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit() {
    this.initInvoice();
  }

  initInvoice(){
    if(this.idPerson == undefined || !NumberUtil.isNumber(this.idPerson))
      this.toasterService.pop('error','Error','Person id is incorrect')
    else{
      if(this.id == undefined || !NumberUtil.isNumber(this.id)){
        this.toasterService.pop('error', 'Error', 'Invoice is incorrect');
      }else{

        this.invoiceService.get(this.id).subscribe((invoice: any)=> {
          if(this.idPerson != invoice.person.id)
            this.toasterService.pop('error', 'Error', 'Id person does not match with the invoice person');
          else{
            this.invoice = invoice;
            this.ready = true;
          }
        }, error=>{
          if(error.status == 404){
            this.toasterService.pop('error', 'Error', 'Invoice is not found');
          }else{
            this.toasterService.pop('error', 'Error', 'it was not possible to load the invoice');
          }
        });

      }
    }
  }

}
