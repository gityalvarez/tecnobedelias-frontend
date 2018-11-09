import { Component, OnInit, TemplateRef, HostListener } from '@angular/core';
import { Carrera } from 'src/app/_models/Carrera';
import { CarreraService } from 'src/app/_services/carrera.service';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { Asignatura } from 'src/app/_models/Asignatura';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { Asignatura_Carrera } from 'src/app/_models/Asignatura_Carrera';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-asignar-asignatura',
  templateUrl: './asignar-asignatura.component.html',
  styleUrls: ['./asignar-asignatura.component.css']
})
export class AsignarAsignaturaComponent implements OnInit {
  modalRef: BsModalRef;
  display = false;
  carreras: Carrera[];
  carrera: Carrera;
  asignaturas: Asignatura[];
  asignatura: Asignatura;
  isOpen: boolean;
  asignaturasFaltantes: Asignatura[];
  asignaturaCarrera: Asignatura_Carrera;
  submit: boolean;
  tieneAsignaturaCarrera : boolean = false;

  // Pruebas para Deshabilitar tecla Control
  /*
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvents(e: KeyboardEvent) {
    if (e.ctrlKey) {
      e.preventDefault();
      console.log(e.key);
      console.log(e.keyCode);
    }
  }

  onKey(e) {
    e.preventDefault();
    console.log(e.key);
  }
  */

  constructor(private router: Router, private carreraService: CarreraService,
    private asignaturaService: AsignaturaService, private modalService: BsModalService) {
    this.asignaturaCarrera = new Asignatura_Carrera();
  }

  ngOnInit() {
    this.carreraService.getCarreras().subscribe(
      (carreras) => {
        this.carreras = carreras;
      }, (error) => {
        console.log(error);
      },
    );
  }

  cargarListas(carrera: Carrera) {
    this.carrera = carrera;
    this.carreraService.getAsignaturas(carrera).subscribe(
      (asignaturas) => {
        this.asignaturas = asignaturas;
      }
    );

    this.carreraService.getAsignaturasFaltantes(carrera).subscribe(
      (asignaturas) => {
        this.asignaturasFaltantes = asignaturas;
      }
    );
  }

  agregarAsignatura(carrera, asignatura, asignaturaCarrera): void {
    console.log(carrera.nombre, asignatura.nombre);
    // this.items.push(`Item ${this.items.length + 1}`);
    this.carreraService.asignarAsignatura(carrera, asignatura, asignaturaCarrera).subscribe(
      (data) => {
        if (data['estado']) {
          console.log('agregue la asignatura  a la carrera');
          alert(data['mensaje']);

        } else {
          alert(data['mensaje']);
        }
      }
    );
  }

  eliminarAsignatura(carrera, asignatura): void {
    // this.items.push(`Item ${this.items.length + 1}`);
    this.carreraService.desasignarAsignatura(carrera, asignatura).subscribe(
      (data) => {
        if (data['estado']) {
          
          alert(data['mensaje']);

        } else {
          console.log('no se pudo eliminar la asignatura  a la carrera');
          alert(data['mensaje']);
          this.asignaturasFaltantes.splice(this.asignaturasFaltantes.indexOf(asignatura), 1);
          this.asignaturas.push(asignatura);
        }
      }
    );
  }

  onMoveToSource(event) {
    console.log('entre al onMoveToSource con ' + this.carrera.nombre + ' y asignatura ' + event.items[0]);
    this.asignatura = event.items[0];
    //si existe una asignaturaCarrera para esa asignatura traigo los datos
    this.asignaturaService.getAsignaturaCarrera(this.asignatura).subscribe(
      (data)=>{
        if (data){
          this.asignaturaCarrera = data
          this.tieneAsignaturaCarrera = true
          console.log(this.tieneAsignaturaCarrera)
        }
      }
    )


    this.showDialog();
    // this.agregarAsignatura(this.carrera,event.items[0],this.asignaturaCarrera)

  }

  onMoveToTarget(event) {
    console.log('entre al onMoveToTarget con ' + this.carrera.nombre + ' y asignatura ' + event.items[0]);
    this.eliminarAsignatura(this.carrera, event.items[0]);
  }


  showDialog() {
    this.display = true;
  }




  onSubmit() {
    this.display = false;
    this.agregarAsignatura(this.carrera, this.asignatura, this.asignaturaCarrera);
  }

  cancelDialog() {
    this.display = false;
    this.asignaturas.splice(this.asignaturasFaltantes.indexOf(this.asignatura), 1);
    this.asignaturasFaltantes.push(this.asignatura);
  }

}
