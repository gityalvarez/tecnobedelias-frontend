import { Component, OnInit } from '@angular/core';
import { Asignatura } from 'src/app/_models/Asignatura';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { Router } from '@angular/router';
import { TokenStorage } from 'src/app/_helpers/TokenStorage';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-lista-asignaturas',
  templateUrl: './lista-asignaturas.component.html',
  styleUrls: ['./lista-asignaturas.component.css']
})
export class ListaAsignaturasComponent implements OnInit {

  public asignaturas:Asignatura[];
  public esDirector:boolean = false;
  msgs: Message[] = [];


  constructor(private asignaturaService:AsignaturaService,private router:Router,private tokenStorage:TokenStorage) { }

  ngOnInit() {
    this.esDirector = (this.tokenStorage.getRole() == "director");
    this.asignaturaService.getAsignaturas().subscribe(
      (asignaturas)=>{
        this.asignaturas=asignaturas;
      },(error)=>{
        console.log(error);
      },
    );
  }

  agregarAsignatura(){
    let asignatura = new Asignatura();
    this.asignaturaService.set(asignatura);
    this.router.navigate(['director/asignatura-form']);
  } 
  
   
  borrarAsignatura(asignatura){
    if(window.confirm('Seguro Quiere eliminar a '+asignatura.nombre+"?")){
      this.asignaturaService.borrarAsignatura(asignatura).subscribe(
        (data)=>{
          if(data.estado){
            //alert(data.mensaje);
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje });
            this.asignaturas.splice(this.asignaturas.indexOf(asignatura),1);           
          }else{
            //alert(data.mensaje);
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje });
          }
        }
      );
    }
  }

  editarAsignatura(asignatura){
    console.log('entre al editar asignatura con la asignatura '+asignatura.nombre)
    this.asignaturaService.set(asignatura);
    this.router.navigate(['director/asignatura-editar'])
  }

}
