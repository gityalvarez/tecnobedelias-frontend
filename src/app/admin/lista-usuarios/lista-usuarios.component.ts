import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_models/Usuario';
import { UsuarioService } from '../../_services/usuario.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Message} from 'primeng/components/common/api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  public usuarios:Usuario[];
  public searchString : string;
  msgs: Message[] = [];
  estudiantes : boolean = false


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
          if(data.estado){
            //alert(data.mensaje)   
            this.usuarios.splice(this.usuarios.indexOf(usuario),1);
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje});
          }else{
            //alert(data.mensaje)
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje});
          }

        }
      );
    }
  }
  
  agregarUsuario(){
    let usuario = new Usuario();
    this.usuarioService.set(usuario);
    this.router.navigate(['administrador/usuario-form']);
  }  


  
  listarEstudiantes(){
    if (this.estudiantes){
      let usuariosArray = new Array
      this.usuarios.forEach(
        usuario=>{
          if (usuario.roles[0].nombre == "ESTUDIANTE"){
            usuariosArray.push(usuario)
          }
        }
      )
      this.usuarios = usuariosArray;
    }else{
      this.usuarioService.getUsuarios().subscribe(
        (usuarios)=>{
          this.usuarios=usuarios;
        },(error)=>{
          console.log(error);
        },
      );     
    }
  }

}
