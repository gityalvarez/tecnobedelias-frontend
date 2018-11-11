import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/_models/Usuario';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit {
  public usuario : Usuario;
  msgs: Message[] = [];
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
      (data)=>{
        if (data.estado){
          //alert(data.mensaje)
          this.msgs = [];
          this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje});
          this.router.navigate(['/administrador']);
        }else{
          //alert(data.mensaje)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje});
        }
      }
    )
  }
  


}
