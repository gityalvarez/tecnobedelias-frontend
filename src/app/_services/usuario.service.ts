import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Usuario } from '../_models/Usuario';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

@Injectable()
export class UsuarioService {
  
  private usuario = new Usuario();

  constructor(private http:HttpClient) { }

  getUsuarios():Observable<any>{
    return this.http.get(environment.API+'/usuario/listar');
  }

  getEstudiante():Observable<any>{
    return this.http.get(environment.API+'/usuario/estudiante');
  }

  borrarUsuario(usuario:Usuario):Observable<any>{
    console.log('entre al borrarUsuario del usuarioService con el usuario '+usuario.username);
    return this.http.post(environment.API+'/usuario/borrar',usuario); 

  }

  agregarUsuario(rol:string,usuario:Usuario):Observable<any>{
    console.log('entre al agregarUsuarioService con el usuario '+usuario.username + ' y el pass '+usuario.password, 'y el rol '+rol);
    return this.http.post(environment.API+'/usuario/crearbien/'+rol,usuario);
  }

  modificarUsuario(usuario:Usuario):Observable<any>{
    return this.http.post(environment.API+'/usuario/modificar',usuario,{params:{'usuarioId': usuario.id.toString()}});
  }

  cambiarPassword(password,resetToken):Observable<any>{
    console.log('entre al cambiarPassword con el password '+password);
    return this.http.get(environment.API+'/usuario/reset',{params:{'resetToken': resetToken,'password':password}});
  }

  modificarPassword(passwordActual,password,passwordConfirm):Observable<any>{
    console.log('entre al cambiarPassword con el password '+password);
    return this.http.get(environment.API+'/usuario/cambiarpassword',{params:{'actualpassword': passwordActual,'newpassword':password, 'newpasswordrepeat':passwordConfirm}});
  }

  set(usuario:Usuario){
    this.usuario=usuario;
  }

  get(){
    return this.usuario;
  }

}
