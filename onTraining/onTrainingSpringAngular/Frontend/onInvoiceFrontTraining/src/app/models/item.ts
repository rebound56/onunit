import { Product } from "./product";
import { FormControl } from "@angular/forms/src/model";

export class Item {
    id : number;
    amount : number;
    grossPricePerUnit : number;
    priceTaxesPerUnit : number;
    totalPriceTaxes : number;
    totalGrossPrice : number;
    total : number;
    product : Product;
    
    // frontend variables    
    nameControlItem: string; 

    controlAmount : FormControl;
    keyControlAmount: string;

    controlProduct : FormControl;
    keyControlProduct: string;

}
