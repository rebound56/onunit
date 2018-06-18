export class Pageable {
    content : any;
    pageable: any;
    sort: any;
    totalElements: number;
    totalPages : number;
    last : boolean;
    size: number ;
    numberOfElements : number;    
    pageSize: number;   
    first: boolean;
    number: number;
    
    listPages : any = [];
  

    constructor(object : any){
        if(object == undefined || object == null) object = {};
        this.content = object['content'];
        this.pageable = object['pageable'];
        this.sort = object['sort'];
        this.totalElements = object['totalElements'];
        this.totalPages = object['totalPages'];
        this.last = object['last'];
        this.size = object['size'];
        this.numberOfElements = object['numberOfElements'];
        this.pageSize = object['pageSize'];
        this.first = object['first'];
        this.number = object['number'];

        if(this.totalPages != undefined){
            this.listPages = [];
            for(let i =0; i < this.totalPages; i++){
                let page = {
                    index:i,
                    label:i+1,
                    active: i==this.number
                }
                this.listPages.push(page);
            }
        }
    }

}
