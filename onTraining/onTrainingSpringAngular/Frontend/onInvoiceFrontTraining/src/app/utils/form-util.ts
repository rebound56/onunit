import { FormGroup, FormControl } from '@angular/forms';

export class FormUtil {
    
    /** It triggers the validation of every form-control from a formGroup */
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
    
    /** It validates if a formcontrol has any error */
    static hasErrors(formControl : FormControl){
        return formControl && formControl.errors && (formControl.dirty || formControl.touched);
    } 

    /** It validates if a formcontrol has a specific error */
    static hasError(formControl : FormControl, error:string){
        return FormUtil.hasErrors(formControl) && formControl.errors[error];
    }   
  
    
}
