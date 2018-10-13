import { Injectable } from "@angular/core";
import * as jwt_decode from 'jwt-decode';



const TOKEN_KEY = 'token';

@Injectable()
export class TokenStorage {

    constructor(){}

    signOut(){
        localStorage.removeItem(TOKEN_KEY);
        localStorage.clear;
    }

    public saveToken(token:string){
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY,token);
    }

    public getToken(){
        return localStorage.getItem(TOKEN_KEY);
    }

    public getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);
      
        if (decoded.exp === undefined) return null;
      
        const date = new Date(0); 
        date.setUTCSeconds(decoded.exp);
        return date;
      }
      
     public  isTokenExpired(token?: string): boolean {
        if(!token) token = this.getToken();
        if(!token) return true;
      
        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
      }

      public getRole():string{
        const token = this.getToken();
        const tokenPayload = jwt_decode(token);
        const role = tokenPayload.roles[0].authority.substring(5).toLowerCase();
        //console.log(tokenPayload.roles[0].authority.substring(5).toLowerCase());
        return role;
      }

      public getSubject():string{
        const token = this.getToken();
        const tokenPayload = jwt_decode(token);
        return tokenPayload.sub;
      }

}