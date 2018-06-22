import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../../services/invoice.service';
import { ToasterService } from 'angular5-toaster';
import { NumberUtil } from '../../utils/number-util';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormUtil } from '../../utils/form-util';
import { Item } from '../../models/item';
import { StringUtil } from '../../utils/string-util';
import { CustomValidator } from '../../utils/custom-validator';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  ready :boolean = false;
  invoice : Invoice;
  idPerson : number;
  id : number;

  formInvoice : FormGroup;
  controlComments : FormControl; 

  totalProductList : Array<Product> = [];
  productList : Array<Product> = [];


  constructor(private personservice :PersonService, private activatedRoute: ActivatedRoute, 
      private invoiceService: InvoiceService, private toasterService : ToasterService, 
      private productService : ProductService, private router : Router) {

    this.idPerson = this.activatedRoute.snapshot.params["idPerson"];
    this.id = this.activatedRoute.snapshot.params["id"];

  }

  ngOnInit() {
      this.initInvoice();
      this.initProduct();
  }

  /** this method intializes the total product list */
  initProduct(){
    this.productService.getAll().subscribe((result : Array<Product>) => {
      this.totalProductList = result;
    }, (error) => {
      this.toasterService.pop('error', 'Error', 'it was not possible to load products');
    });
  }

  /** this method intializes a form */
  initForm(invoice : Invoice){
    this.invoice = invoice;
    // initializes form control    
    this.controlComments = new FormControl(this.invoice.comments);
    
    // setting validators      
    this.controlComments.setValidators([      
      Validators.maxLength(500)
    ]);

    // create form group
    this.formInvoice = new FormGroup({      
      controlComments : this.controlComments
    });

    if(this.invoice.listItem != undefined){
      this.invoice.listItem.forEach(item => {
        item = this.addControlItem(item);
      });
    }
       
    this.ready = true;
  }

  initInvoice(){
    if(this.idPerson == undefined || !NumberUtil.isNumber(this.idPerson))
      this.toasterService.pop('error','Person id invalid')
    else{
      if(this.id == undefined){
        this.personservice.get(this.idPerson).subscribe((person:Person) => {          
          let invoice = new Invoice();
          invoice.person = person;          
          this.initForm(invoice);         
        }, error => {
          if(error.status == 404){
            this.toasterService.pop('error', 'Error', 'Person is not found');
          }else{
            this.toasterService.pop('error', 'Error', 'it was not possible to load the person');
          }          
        });

      }else{

        this.invoiceService.get(this.id).subscribe((invoice: Invoice)=> {
          if(this.idPerson != invoice.person.id)
            this.toasterService.pop('error', 'Error', 'Id person does not match with the invoice person');
          else{
            this.initForm(invoice);
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

   /** This methods returns a boolean if the control has any error */
   hasErrors(formControl : FormControl){
    return FormUtil.hasErrors(formControl);
  } 
  /** This methods returns a boolean if the control has a specific error */
  hasError(formControl : FormControl, error:string){
    return FormUtil.hasError(formControl,error);
  }

  /** This method saves invoice */
  save () {    
    if(!this.formInvoice.valid)
      FormUtil.validateFormFields(this.formInvoice);
    else if(this.invoice.listItem == undefined || this.invoice.listItem.length ==0){ 
      this.toasterService.pop('warning', 'Products are required', 'Please search product');
    }else{      
      this.invoiceService.save(this.invoice).subscribe((result : Invoice)=> {        
          this.toasterService.pop('success', 'Invoice saved', 'The invoice has been saved successfully');
          this.router.navigate(['/invoice/'+this.idPerson+'/detail/'+result.id]);        
      }, (error) =>{
        this.toasterService.pop('error', "Error", 'It was not possible to save the invoice');        
      });
    }
  }


   
  private addControlItem(item : Item) : Item{
    item.nameControlItem = 'item_'+StringUtil.getRandomString();  

    let amount: FormControl = new FormControl(item.amount);
    amount.setValidators([
      Validators.required,
      Validators.min(1),
      CustomValidator.number()
    ]);
    
    
    item.controlAmount = amount;
    item.keyControlAmount = item.nameControlItem + '_amount';
    this.formInvoice.addControl(item.keyControlAmount, item.controlAmount);
    item.toJSON  = new Item().toJSON;
    return item;
  }

  private removeControlItem(item : Item){
    let arrayItem = [];
    for(let i=0; i< this.invoice.listItem.length ; i++){
      let element: Item = this.invoice.listItem[i];
      if(element.nameControlItem === item.nameControlItem){
        this.formInvoice.removeControl(item.keyControlAmount);        
      }else{
        arrayItem.push(element);
      }
    }
    this.invoice.listItem = arrayItem;
  }

 

  autocomplete(event){
    let scope = this;
    this.productList = [];
    let value = event.srcElement.value;
    if(value && value.length && value.length >= 2){
      this.totalProductList.forEach(function (product) {
        if(product.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 ){
          scope.productList.push(product);
        }
      });
    }
  }

  selectProduct(product:Product){
    
    let item : Item;
    if(!this.invoice.listItem)
      this.invoice.listItem = [];

    this.invoice.listItem.forEach((element: Item) => {
      if(element.product.id == product.id){
        item = element;
        if(item.amount == undefined || item.amount <= 0)
          item.amount=1
        else
          item.amount++;

      }
    });
    if(item == undefined){
      item = new Item();
      item.amount =1
      item.product = product;
      this.invoice.listItem.push(item);
      this.addControlItem(item);
    }              
  }

  onBlurAutoComplete(event){
    setTimeout(() => {
      this.productList = [];
      event.srcElement.value='';
    },100);    
  }

  getTotal() : number{
    let total : number = 0;
    if(this.invoice != undefined && this.invoice.listItem != undefined){
      this.invoice.listItem.forEach((item : Item) => {
        if(item.amount !=undefined && item.amount >0 && item.product != undefined && item.product.id != undefined){
          total = total + ((item.product.grossPricePerUnit + item.product.priceTaxesPerUnit) * item.amount)
        }
      });
    }
    return total;
  }

}
