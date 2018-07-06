import { Injectable } from '@angular/core';
import { HttpEvent, HttpErrorResponse,HttpRequest,HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/do';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
 

  constructor(private authService : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request: HttpRequest<any> = req;
    
    if(this.authService.hasToken()){
      request = req.clone({
        headers : req.headers.set("Authorization", "Bearer "+this.authService.getToken())
      });     
    }
    return next.handle(request).do(this.onSuccessResponse, this.onErrorResponse);
  }

  private onSuccessResponse(event : HttpEvent<any>){
    
    if(event instanceof HttpResponse){
      // do something with the response
    }
  }
  private onErrorResponse(error : any){
    
    if(error instanceof HttpErrorResponse){
      if(error.status === 401){
        // do something when the status is unauthorized
      }
      if(error.status === 403){
        // do something when the status is forbidden 
      }
      if(error.status === 500){
        // do something  when the status is failed
      }
      if(error.status === 0){
        // do something when the status is down
      }
    }
  }
}
