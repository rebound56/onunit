import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { User } from '../../models/user';
import { FormUtil } from '../../utils/form-util';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from 'angular5-toaster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin : FormGroup;
  controlUsername : FormControl;
  controlPassword: FormControl;
  user: User;

  constructor(private authService: AuthService, private toasterService : ToasterService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.user = new User();
    this.controlPassword = new FormControl(this.user.password,[Validators.required]);
    this.controlUsername = new FormControl(this.user.username,[Validators.required]);
    // add controls to form
    this.formLogin = new FormGroup({
      controlPassword:this.controlPassword,
      controlUsername:this.controlUsername
    });
  }

  login(){
    if(!this.formLogin.valid)
      FormUtil.validateFormFields(this.formLogin);
    else{
      this.authService.login(this.user).subscribe((result:any) => {
        this.authService.setToken(result.token);        
        this.toasterService.pop("success", "Logged in", "The user has logged in!");
      }, (error) => {
        debugger;
        if(error.status === 401)
          this.toasterService.pop("warning", "Error", "Username or password incorrect");
        else 
          this.toasterService.pop("error", "Error", "Error trying to log in");
      });
    }
  }

  /** This methods returns a boolean if the control has any error */
  hasErrors(formControl : FormControl){
    return FormUtil.hasErrors(formControl);
  } 
  /** This methods returns a boolean if the control has a specific error */
  hasError(formControl : FormControl, error:string){
    return FormUtil.hasError(formControl,error);
  } 
}
