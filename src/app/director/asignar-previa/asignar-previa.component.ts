import { Component, OnInit } from '@angular/core';
import {PickListModule} from 'primeng/picklist';
import { Carrera } from 'src/app/_models/Carrera';
import { Asignatura } from 'src/app/_models/Asignatura';
import { CarreraService } from 'src/app/_services/carrera.service';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { Asignatura_Carrera } from 'src/app/_models/Asignatura_Carrera';

@Component({
  selector: 'app-asignar-previa',
  templateUrl: './asignar-previa.component.html',
  styleUrls: ['./asignar-previa.component.css']
})
export class AsignarPreviaComponent implements OnInit {

  carreras : Carrera[];
  carrera : Carrera;
  asignaturas : Asignatura[];
  previas:Asignatura_Carrera[];
  posibles:Asignatura_Carrera[];

  constructor(private carreraService:CarreraService, private asignaturaService:AsignaturaService) { }

  ngOnInit() {
    
    this.carreraService.getCarreras().subscribe(
      (carreras)=>{
        this.carreras=carreras;
      },(error)=>{
        console.log(error);
      },
    );    
  }

  seleccionarAsignatura(asignatura:Asignatura,carrera:Carrera){
    this.carreraService.getPrevias(asignatura,carrera).subscribe(
      (previas)=>{
        this.previas=previas;
        this.posibles = carrera.asignaturaCarrera;
      },(error)=>{
        console.log(error);
      },
    );

  }

  

}
