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
}
