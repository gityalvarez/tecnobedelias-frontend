import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  borrarUsuario(usuario:Usuario):Observable<any>{
    console.log('entre al borrarUsuario del usuarioService con el usuario '+usuario.username);
    return this.http.post(environment.API+'/usuario/borrar',usuario); 

  }

  agregarUsuario(rol:string,usuario:Usuario):Observable<any>{
    console.log('entre al agregarUsuarioService con el usuario '+usuario.username + ' y el pass '+usuario.password, 'y el rol '+rol);
    return this.http.post(environment.API+'/usuario/crear/'+rol,usuario);
  }

  set(usuario:Usuario){
    this.usuario=usuario;
  }

  get(){
    return this.usuario;
  }

}
