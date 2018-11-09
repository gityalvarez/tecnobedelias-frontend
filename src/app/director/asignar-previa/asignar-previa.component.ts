import { Component, OnInit } from '@angular/core';
import { PickListModule } from 'primeng/picklist';
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

  carreras: Carrera[];
  carrera: Carrera;
  asignatura: Asignatura;
  asignaturas: Asignatura[];
  previas: Asignatura[];
  previasPosibles: Asignatura[];


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
    this.carreraService.getPreviasPosibles(asignatura, this.carrera).subscribe(
      (previasPosibles) => {
        this.previasPosibles = previasPosibles;
      }, (error) => {
        console.log(error);
      },
    );
  }

  agregarPrevia(asignaturaPrevia: Asignatura) {
    console.log(this.carrera.nombre, this.asignatura.nombre, asignaturaPrevia.nombre);
    this.carreraService.asignarPrevia(this.carrera, this.asignatura, asignaturaPrevia).subscribe(
      (data) => {
        if (data['estado']) {
          console.log('agregue la asignatura  a la carrera');
          alert(data['mensaje']);
        } else {
          console.log('no se pudo agregar la asignatura');
          alert(data['mensaje']);
          this.previas.splice(this.previas.indexOf(asignaturaPrevia), 1);
          this.previasPosibles.push(asignaturaPrevia);
        }

      }
    );
  }

  eliminarPrevia(asignaturaPrevia: Asignatura) {
    console.log(this.carrera.nombre, this.asignatura.nombre, asignaturaPrevia.nombre);
    this.carreraService.desasignarPrevia(this.carrera, this.asignatura, asignaturaPrevia).subscribe(
      (data) => {
        if (data['estado']) {
          console.log('elimine la asignatura  a la carrera');
          alert(data['mensaje']);
        } else {
          console.log('no se pudo agregar la asignatura');
          alert(data['mensaje']);
          this.previasPosibles.splice(this.previasPosibles.indexOf(asignaturaPrevia), 1);
          this.previas.push(asignaturaPrevia);
        }
      }
    );
  }


  onMoveToSource(event) {
    console.log('entre al onMoveToSource con ' + this.carrera.nombre + ' y asignatura ' + event.items[0]);
    this.agregarPrevia(event.items[0]);
  }

  onMoveToTarget(event) {
    console.log('entre al onMoveToTarget con ' + this.carrera.nombre + ' y asignatura ' + event.items[0]);
    this.eliminarPrevia(event.items[0]);
  }



}
