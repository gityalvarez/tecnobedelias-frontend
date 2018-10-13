import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorage } from '../_helpers/TokenStorage';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:Http,private tokenStorage:TokenStorage) { }

  auth(username:string,password:string):Observable<any>{
    const credenciales={ username:username,password:password};
    return this.http.post(environment.API + '/login',credenciales);
  }

  isAuthenticated():boolean{
    console.log('entro al is authenticated');
    const token = this.tokenStorage.getToken();
    console.log('consegui el token '+token);
    if (token!==null){
      return !this.tokenStorage.isTokenExpired(token);
    }
    console.log('retorno false');
    return false;
  }
}





