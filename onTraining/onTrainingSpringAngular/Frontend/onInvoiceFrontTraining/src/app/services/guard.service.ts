import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class GuardService implements CanActivate{
  loggedIn : boolean = false;

  constructor(private authService: AuthService) { 
    this.authService.isAuthenticated().subscribe((result: boolean) => {
      this.loggedIn = result;
    }, (error)=> {
      this.loggedIn = false;
      console.log("error", error);
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.loggedIn;
  }

}
