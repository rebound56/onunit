import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn : boolean = false;
  constructor(private authService: AuthService){ 
    this.authService.isAuthenticated().subscribe((result : boolean)=>{
      debugger;
      this.loggedIn = result;
    }, (error)=>{
      debugger;
      this.loggedIn= false;
      console.log("ERROR", error);      
    })
  }

  logout(){
    this.authService.removeToken();
  }
}
