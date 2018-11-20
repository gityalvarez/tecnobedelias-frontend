import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/_models/Carrera';
import { Asignatura } from 'src/app/_models/Asignatura';
import { CarreraService } from 'src/app/_services/carrera.service';
import { AsignaturaService } from 'src/app/_services/asignatura.service';

@Component({
  selector: 'app-lista-previas',
  templateUrl: './lista-previas.component.html',
  styleUrls: ['./lista-previas.component.css']
})
export class ListaPreviasComponent implements OnInit {

  carreras: Carrera[];
  carrera: Carrera;
  asignatura: Asignatura;
  asignaturas: Asignatura[];
  previas: Asignatura[];

  constructor(private carreraService: CarreraService, private asignaturaService: AsignaturaService) { }

  ngOnInit() {

    
    this.carreraService.getCarreras().subscribe(
      (carreras) => {
        this.carreras = carreras;
      }, (error) => {
        console.log(error);
      },
    );
  }

  cargarAsignaturas(carrera: Carrera) {
    this.carrera = carrera;
    this.carreraService.getAsignaturas(carrera).subscribe(
      (asignaturas) => {
        this.asignaturas = asignaturas;
      }
    );
  }


  cargarPrevias(asignatura: Asignatura) {
    this.asignatura = asignatura;
    this.carreraService.getPrevias(asignatura, this.carrera).subscribe(
      (previas) => {
        this.previas = previas;
      }, (error) => {
        console.log(error);
      },
    );
  }

}
