import { Component, OnInit, Input } from '@angular/core';
import { Pageable } from '../../models/pageable';
import { NumberUtil } from '../../utils/number-util';
import { InvoiceService } from '../../services/invoice.service';
import { ToasterService } from 'angular5-toaster';

@Component({
  selector: 'app-person-invoice-list',
  templateUrl: './person-invoice-list.component.html',
  styleUrls: ['./person-invoice-list.component.css']
})
export class PersonInvoiceListComponent implements OnInit {
  
  @Input() public id:number;
  pageable : Pageable;
  ready : boolean = false;
  
  constructor(private invoiceService : InvoiceService, private toasterService : ToasterService) { }

  ngOnInit() {
  }

  initList(pageable :Pageable){
    setTimeout(() => {
      this.pageable = pageable;
      if(this.id == undefined || !NumberUtil.isNumber(this.id))
        this.toasterService.pop('error', "Error", 'The id is not correct');
      else{
        this.invoiceService.getByPersonId(this.id,this.pageable).subscribe((result)=>{
          this.pageable = new Pageable(result);
          this.ready= true;
        }, (error) => {
          this.toasterService.pop('error', "Error", 'It was not possible to list invoice');
        })
      }
      this.ready = true;
    });    
  }

  delete(id: number){
    if(confirm('Are you sure you want to delete this invoice?')){
      this.invoiceService.delete(id).subscribe((result)=> {
        this.toasterService.pop('success', "Invoice deleted", 'Invoice has been deleted successfully');
        this.initList(this.pageable)
      } , (errror)=>{
        this.toasterService.pop('error', "Error", 'It was not possible to delete the invoice');
      });
    }
  }
}
