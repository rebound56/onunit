import { ValidatorFn, ValidationErrors } from "@angular/forms/src/directives/validators";
import { AbstractControl, FormControl } from "@angular/forms/src/model";
import { DateUtil } from "./date-util";
import { NumberUtil } from "./number-util";

export class CustomValidator {
    
    /** It validates if a formcontrol value matches with another one */
    static match(controlToCompare :FormControl) : ValidatorFn {
        return (control : AbstractControl): {[key: string]: boolean} => {
            if(control.value === controlToCompare.value)
                return null;            
            return {'match': true}; 
        }
    }

    /** It validates if the control date value is older than another one */
    static mindate(controlToCompare :FormControl) : ValidatorFn {
        return (control : AbstractControl): {[key: string]: boolean} => {            
            if(controlToCompare != null && controlToCompare != undefined){
                let value = control.value;            
                let valueToCompare = controlToCompare.value;            
                let date = DateUtil.getDate(value);
                let dateToCompare = DateUtil.getDate(valueToCompare);

                if(date != null && dateToCompare != null)
                    if(date.getTime() < dateToCompare.getTime())
                        return {'mindate': true};  
            }

            return null;
        }
    }

    /** It validates if the control date value is younger than another one */
    static maxdate(controlToCompare :FormControl) : ValidatorFn {
        return (control : AbstractControl): {[key: string]: boolean} => {   
            if(controlToCompare != null && controlToCompare != undefined){         
                let value = control.value;
                let valueToCompare = controlToCompare.value;            
                let date = DateUtil.getDate(value);
                let dateToCompare = DateUtil.getDate(valueToCompare);

                if(date != null && dateToCompare != null)
                    if(date.getTime() > dateToCompare.getTime())
                        return {'maxdate': true};  
            }
            return null;
        }
    }

    /** It validates if a formcontrol value matches with another one */
    static number() : ValidatorFn {
        return (control : AbstractControl): {[key: string]: boolean} => {
            if(!control.value || NumberUtil.isNumber(control.value))
                return null;
            return {'number': true}; 
        }
    }
}
