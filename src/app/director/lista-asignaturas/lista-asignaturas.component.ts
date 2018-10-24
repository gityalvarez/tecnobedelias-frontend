import { Component, OnInit } from '@angular/core';
import { Asignatura } from 'src/app/_models/Asignatura';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { Router } from '@angular/router';
import { TokenStorage } from 'src/app/_helpers/TokenStorage';

@Component({
  selector: 'app-lista-asignaturas',
  templateUrl: './lista-asignaturas.component.html',
  styleUrls: ['./lista-asignaturas.component.css']
})
export class ListaAsignaturasComponent implements OnInit {

  public asignaturas:Asignatura[];
  public esDirector:boolean = false;

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
          if(data){
            alert("Se eliminó la asignatura "+asignatura.nombre+" correctamente");
            this.asignaturas.splice(this.asignaturas.indexOf(asignatura),1);           
          }else{
            alert("No se pudo eliminar la carrera "+asignatura.nombre);
          }
        }
      );
    }
  }

}
