import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/_models/Usuario';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {
  private usuario : Usuario;
  constructor(private usuarioService:UsuarioService, private router : Router) { }

  ngOnInit() {
    this.usuario = this.usuarioService.get()
    console.log(this.usuario)
  }

  cancelar(){
    this.router.navigate(['/administrador']);
  }

  editar(){
    this.usuarioService.modificarUsuario(this.usuario).subscribe(
      (data)=>{console.log('pude modificar '+data)
      this.router.navigate(['/administrador']);
    },
    (error)=>console.log(error)
    )
  }


}
