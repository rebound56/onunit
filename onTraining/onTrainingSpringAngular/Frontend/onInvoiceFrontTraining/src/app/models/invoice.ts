import { Person } from "./person";

export class Invoice {
    id : number;
    code : string;
    comments : string;
    totalPriceTaxes : number;
    totalGrossPrice : number;
    total : number;
    createdAt : string;
    modifiedAt : string;
    person : Person;
    listItem : any;
}
