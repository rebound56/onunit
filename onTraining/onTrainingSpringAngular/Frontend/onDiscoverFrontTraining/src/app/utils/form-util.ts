import { FormGroup, FormControl } from '@angular/forms';

export class FormUtil {
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
    static hasErrors(formControl : FormControl){
        return formControl.errors && (formControl.dirty || formControl.touched);
    } 

    static hasError(formControl : FormControl, error?:string){
        return FormUtil.hasErrors(formControl) && formControl.errors[error];
    } 
    
}
