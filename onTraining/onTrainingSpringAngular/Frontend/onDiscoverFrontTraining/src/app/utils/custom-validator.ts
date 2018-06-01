import { ValidatorFn, ValidationErrors } from "@angular/forms/src/directives/validators";
import { AbstractControl, FormControl } from "@angular/forms/src/model";
import { FormUtil } from "./form-util";

export class CustomValidator {

    /**
     * It allows to validate if a formcontrol value matches with another one
     * @param controlToCompare 
     */
    static match(controlToCompare :FormControl) : ValidatorFn {
        return (control : AbstractControl): {[key: string]: boolean} => {
            if(control.value === controlToCompare.value){
                return null;
            }
            return {'match': true}; 
        }
    }

    /**
     * It allows to validate if the control date value must be older than controlToCompare 
     * @param controlToCompare 
     */
    static mindate(controlToCompare :FormControl) : ValidatorFn {
        return (control : AbstractControl): {[key: string]: boolean} => {            
            if(controlToCompare != null && controlToCompare != undefined){
                let value = control.value;            
                let valueToCompare = controlToCompare.value;            
                let date = FormUtil.getDate(value);
                let dateToCompare = FormUtil.getDate(valueToCompare);

                if(date != null && dateToCompare != null)
                    if(date.getTime() < dateToCompare.getTime())
                        return {'mindate': true};  
            }

            return null;
        }
    }

    /**
     * It allows to validate if the control date value must be younger than controlToCompare 
     * @param controlToCompare 
     */
    static maxdate(controlToCompare :FormControl) : ValidatorFn {
        return (control : AbstractControl): {[key: string]: boolean} => {   
            if(controlToCompare != null && controlToCompare != undefined){         
                let value = control.value;
                let valueToCompare = controlToCompare.value;            
                let date = FormUtil.getDate(value);
                let dateToCompare = FormUtil.getDate(valueToCompare);

                if(date != null && dateToCompare != null)
                    if(date.getTime() > dateToCompare.getTime())
                        return {'maxdate': true};  
            }
            return null;
        }
    }
}
