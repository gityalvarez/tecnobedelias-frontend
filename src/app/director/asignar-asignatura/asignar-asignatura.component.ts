import { Component, OnInit, TemplateRef } from '@angular/core';
import { Carrera } from 'src/app/_models/Carrera';
import { CarreraService } from 'src/app/_services/carrera.service';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { Asignatura } from 'src/app/_models/Asignatura';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { Asignatura_Carrera } from 'src/app/_models/Asignatura_Carrera';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-asignar-asignatura',
  templateUrl: './asignar-asignatura.component.html',
  styleUrls: ['./asignar-asignatura.component.css']
})
export class AsignarAsignaturaComponent implements OnInit {
  modalRef: BsModalRef;

  carreras : Carrera[];
  carrera : Carrera;
  asignaturas : Asignatura[];
  isOpen:boolean;
  asignaturasFaltantes : Asignatura[];

  constructor(private router:Router, private carreraService:CarreraService,private asignaturaService:AsignaturaService,private modalService: BsModalService) { }

  ngOnInit() {
    this.carreraService.getCarreras().subscribe(
      (carreras)=>{
        this.carreras=carreras;
      },(error)=>{
        console.log(error);
      },
    );     
  }

  cargarListas(carrera:Carrera){
    this.carrera = carrera;
    this.carreraService.getAsignaturas(carrera).subscribe(
      (asignaturas)=>{
        this.asignaturas = asignaturas;
      }
    );
  
    this.carreraService.getAsignaturasFaltantes(carrera).subscribe(
      (asignaturas)=>{
        this.asignaturasFaltantes = asignaturas;
      }
    );
  }
  
  agregarAsignatura(carrera,asignatura): void {
    console.log(carrera.nombre,asignatura.nombre);
    //this.items.push(`Item ${this.items.length + 1}`);
    this.carreraService.asignarAsignatura(carrera,asignatura).subscribe(
      (data)=>{
        console.log("agregue la asignatura  a la carrera");
        alert("La asignatura "+asignatura.nombre+" fue asignada correctamente"); 
      }
    );
  }

  eliminarAsignatura(carrera,asignatura): void {
    //this.items.push(`Item ${this.items.length + 1}`);
    this.carreraService.desasignarAsignatura(carrera,asignatura).subscribe(
      (data)=>{
        if(data){
          console.log("elimine la asignatura  a la carrera");
          alert("La asignatura "+asignatura.nombre+" fue desasignada correctamente"); 

        }else{
          console.log("no se pudo eliminar la asignatura  a la carrera");
          alert("La asignatura "+asignatura.nombre+" no pude ser desasignada correctamente");
          this.asignaturasFaltantes.splice(this.asignaturasFaltantes.indexOf(asignatura),1);
          this.asignaturas.push(asignatura);
        }
      }
    );
  }

  onMoveToSource(event){
    console.log('entre al onMoveToSource con '+this.carrera.nombre +' y asignatura '+event.items[0]);
    this.agregarAsignatura(this.carrera,event.items[0])
  }

  onMoveToTarget(event){
    console.log('entre al onMoveToTarget con '+this.carrera.nombre +' y asignatura '+event.items[0]);
    this.eliminarAsignatura(this.carrera,event.items[0])
  }

}
