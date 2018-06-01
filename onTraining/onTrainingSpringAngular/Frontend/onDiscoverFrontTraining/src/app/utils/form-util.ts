import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

export class FormUtil {
    /**
     * It allows to trigger the validation of every form-control from a formGroup
     * @param formGroup 
     */
    static validateFormFields(formGroup: FormGroup){
        Object.keys(formGroup.controls).forEach(field => {
            var control = formGroup.get(field);
            if(control instanceof FormControl){
                control.markAsTouched({onlySelf:true});
            }else if (control instanceof FormGroup){
                FormUtil.validateFormFields(control);
            }
        });
    }
    /**
     * It allows to validate if a formcontrol has errors
     * @param formControl 
     */
    static hasErrors(formControl : FormControl){
        return formControl.errors && (formControl.dirty || formControl.touched);
    } 

    /**
     * It allows to validate if a formcontrol has a specific error
     * @param formControl 
     * @param error 
     */
    static hasError(formControl : FormControl, error?:string){
        return FormUtil.hasErrors(formControl) && formControl.errors[error];
    } 

    /**
     * It allows to get a date from string
     * @param stringValue 
     */
    static getDate(stringValue : string) : Date{
        // date format YYYY-MM-DD
        var momentObj = moment(stringValue,'YYYY-MM-DD');
        if(momentObj && momentObj.isValid()){
            return momentObj.toDate();
        }
        return null;
    }
  
    
}
