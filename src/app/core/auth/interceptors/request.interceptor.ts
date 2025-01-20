import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler,HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
 
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private token = localStorage.getItem("access_token_assemblyline"); 
 
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    if (request.url.includes('http://localhost:4400/Assemblyline')) {     
      if (!request.headers.has('Content-Type')) {
          request = request.clone({
              headers: request.headers.set('Content-Type', 'application/json')
          });
      }   
      const authReq = this.addAuthenticationToken(request);                
      return next.handle(authReq);
    }
    else {
      return next.handle(request);
    }
  }
     
  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {   
    if (!this.token) {       
        return request;
    }
    
    // exclude routes
    if (request.url.indexOf('/v1/authorization/Token') != -1) {         
        return request;
    }

    return request.clone({ headers: request.headers.set("Authorization", "Bearer " + this.token) });                           
  }
}