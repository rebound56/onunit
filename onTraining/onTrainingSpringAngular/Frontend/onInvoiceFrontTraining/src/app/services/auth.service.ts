import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  login(user: User){
    return this.httpClient.post('http://localhost:8080/api/user/login',user,
    {headers: new HttpHeaders({'Content-Type':'application/json'})});
  }

  setToken(token: string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  removeToken(){
    localStorage.removeItem("token");
  }

  isAuthenticated(){
    return this.getToken() != undefined && this.jwtHelper.isTokenExpired(this.getToken());
  }
}
