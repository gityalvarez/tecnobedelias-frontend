import { Component, OnInit, TemplateRef } from '@angular/core';
import { Carrera } from 'src/app/_models/Carrera';
import { CarreraService } from 'src/app/_services/carrera.service';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { Asignatura } from 'src/app/_models/Asignatura';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';

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

  constructor(private router:Router, private carreraService:CarreraService,private asignaturaService:AsignaturaService,private modalService: BsModalService) { }

  ngOnInit() {
    this.carreraService.getCarreras().subscribe(
      (carreras)=>{
        this.carreras=carreras;
      },(error)=>{
        console.log(error);
      },
    );
    /*this.asignaturaService.getAsignaturas().subscribe(
      (asignaturas)=>{
        this.asignaturas=asignaturas;
      },(error)=>{
        console.log(error);
      },
    )*/
    
  }

  openModal(template: TemplateRef<any>,carrera:Carrera) {
    console.log("entre al openModal con la carrera "+carrera.nombre);
    this.asignaturaService.getAsignaturasFaltantes(carrera).subscribe(
      (asignaturas)=>{
        this.asignaturas=asignaturas;
      },(error)=>{
        console.log(error);
      },
    )
    this.modalRef = this.modalService.show(template);
  }
  
  agregarAsignatura(carrera,asignatura): void {
    //this.items.push(`Item ${this.items.length + 1}`);
    this.carreraService.asignarAsignatura(carrera,asignatura).subscribe(
      (data)=>{
        console.log("agregue la asignatura  a la carrera");
        alert("La asignatura "+asignatura.nombre+" fue asignada correctamente"); 
      }
    );
      this.modalRef.hide(); 
  }

  eliminarAsignatura(carrera,asignatura): void {
    //this.items.push(`Item ${this.items.length + 1}`);
    this.carreraService.desasignarAsignatura(carrera,asignatura).subscribe(
      (data)=>{
        console.log("elimine la asignatura  a la carrera");
        alert("La asignatura "+asignatura.nombre+" fue desasignada correctamente");  
      }
    );
  }

}


