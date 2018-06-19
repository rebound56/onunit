import { Product } from "./product";

export class Item {
    id : number;
    amount : number;
    grossPricePerUnit : number;
    priceTaxesPerUnit : number;
    totalPriceTaxes : number;
    totalGrossPrice : number;
    total : number;
    product : Product;
}
