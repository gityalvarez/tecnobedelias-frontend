import { Component, OnInit } from '@angular/core';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { CarreraService } from 'src/app/_services/carrera.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { TokenStorage } from 'src/app/_helpers/TokenStorage';
import { Examen } from 'src/app/_models/Examen';
import { Asignatura } from 'src/app/_models/Asignatura';
import { Carrera } from 'src/app/_models/Carrera';

@Component({
  selector: 'app-lista-examenes',
  templateUrl: './lista-examenes.component.html',
  styleUrls: ['./lista-examenes.component.css']
})
export class ListaExamenesComponent implements OnInit {

  carreras : Carrera[];
  carrera : Carrera;
  asignaturas : Asignatura[];
  asignatura: Asignatura;
  examenes : Examen[];
  examen : Examen;
  username:string;
  estudiante:Object;

  constructor(private inscripcionService : InscripcionService,private carreraService : CarreraService,
    private usuarioService:UsuarioService,private tokenStorage:TokenStorage) { }

  ngOnInit() {
    if (this.tokenStorage.getRole() == "estudiante"){
      this.username = this.tokenStorage.getSubject();
    }
    this.usuarioService.getEstudiante().subscribe(
      (estudiante)=>{
        this.estudiante = estudiante;
        this.carreras = estudiante.carreras;
        console.log('obtuve el estudiante '+estudiante.username)
      }
    );
  }

  inscripcionAExamen(examen:Examen){
    this.inscripcionService.inscripcionAExamen(examen).subscribe(
      (data)=>{
        alert("La inscripcion al examen fue exitosa")
      },
      (error)=>{
        alert("No se pudo inscribir al examen")
      }
    )
  }

}
