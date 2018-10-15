import { Component, OnInit } from '@angular/core';
import { Asignatura } from 'src/app/_models/Asignatura';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-asignaturas',
  templateUrl: './lista-asignaturas.component.html',
  styleUrls: ['./lista-asignaturas.component.css']
})
export class ListaAsignaturasComponent implements OnInit {

  public asignaturas:Asignatura[];

  constructor(private asignaturaService:AsignaturaService,private router:Router) { }

  ngOnInit() {
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
  
   
  borrarCarrera(asignatura){
    console.log('entre al borrarAsignatura del lista Asignatura con la asignatura '+asignatura.nombre);
    if(window.confirm('Seguro Quiere eliminar a '+asignatura.nombre+"?")){
      this.asignaturaService.borrarAsignatura(asignatura).subscribe(
        (data)=>{
          console.log('a la vuelta del suscribe');
          this.asignaturas.splice(this.asignaturas.indexOf(asignatura),1);
        }
      );
    }
  }

}
