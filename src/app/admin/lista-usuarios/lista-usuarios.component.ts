import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_models/Usuario';
import { UsuarioService } from '../../_services/usuario.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  public usuarios:Usuario[];
  public searchString : string;


  constructor(private usuarioService:UsuarioService, private router:Router) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios)=>{
        this.usuarios=usuarios;
      },(error)=>{
        console.log(error);
      },
    );    
  }

  editarUsuario(usuario){
    console.log('entre al editar usaurio con el usuario '+usuario.nombre)
    this.usuarioService.set(usuario);
    this.router.navigate(['administrador/usuario-editar'])
  }


  borrarUsuario(usuario){
    console.log('entre al borrarUsuario del lista Usuarios con el usuario '+usuario.username);
    if(window.confirm('Seguro Quiere eliminar a '+usuario.username+"?")){
      this.usuarioService.borrarUsuario(usuario).subscribe(
        (data)=>{
          console.log('a la vuelta del suscribe');
          this.usuarios.splice(this.usuarios.indexOf(usuario),1);
        }
      );
    }
  }
  
  agregarUsuario(){
    let usuario = new Usuario();
    this.usuarioService.set(usuario);
    this.router.navigate(['administrador/usuario-form']);
  }  

}
