import { ValidatorFn, ValidationErrors } from "@angular/forms/src/directives/validators";
import { AbstractControl, FormControl } from "@angular/forms/src/model";

export class CustomValidator {
    static match(controlToCompare :FormControl) : ValidatorFn {
        return (control : AbstractControl): {[key: string]: boolean} => {        
            let value = control.value;
            if(value === controlToCompare.value){
                return null;
            }
            return {'match': true}; 
        }
    }
}
