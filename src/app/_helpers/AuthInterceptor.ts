import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenStorage } from "./TokenStorage";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private tokenStorage:TokenStorage){}

    intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        if(this.tokenStorage.getToken()){
            request = request.clone({
                setHeaders:{
                    
                    Authorization: localStorage.getItem('token')
                }
            });
        }
        return next.handle(request);
        
    }
}


