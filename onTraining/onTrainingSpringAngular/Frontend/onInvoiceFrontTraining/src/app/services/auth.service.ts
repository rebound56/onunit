import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class AuthService {

  private isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  login(user: User){
    return this.httpClient.post('http://localhost:8080/api/user/login',user,
    {headers: new HttpHeaders({'Content-Type':'application/json'})});
  }

  setToken(token: string){
    localStorage.setItem("token", token);
    this.isLoginSubject.next(true);    
  }

  getToken(){
    return localStorage.getItem("token");
  }

  removeToken(){
    localStorage.removeItem("token");
    this.isLoginSubject.next(false);
  }

  hasToken() : boolean{
    return this.getToken() != undefined && this.getToken() != null && !this.jwtHelper.isTokenExpired(this.getToken());   
  }

  isAuthenticated() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

}
