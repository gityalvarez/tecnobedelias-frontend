import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { TokenStorage } from '../_helpers/TokenStorage';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth:AuthService, public router:Router,public tokenStorage:TokenStorage) { }

  canActivate(route: ActivatedRouteSnapshot):boolean{
    const expectedRole = route.data.expectedRole;
    const role = this.tokenStorage.getRole();
      if(role == expectedRole){
        return true;
      }
      else this.router.navigate([role]);
  }
}
