import { Component, OnInit } from '@angular/core';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { TokenStorage } from 'src/app/_helpers/TokenStorage';
import { Curso } from 'src/app/_models/Curso';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { Usuario } from 'src/app/_models/Usuario';
import { CarreraService } from 'src/app/_services/carrera.service';
import { Carrera } from 'src/app/_models/Carrera';
import { Asignatura } from 'src/app/_models/Asignatura';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit {

carreras : Carrera[];
carrera : Carrera;
asignaturas : Asignatura[];
asignatura: Asignatura;
cursos : Curso[];
curso : Curso;
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

  inscripcionACurso(curso:Curso){
    this.inscripcionService.inscripcionACurso(curso).subscribe(
      (data)=>{
        alert("La inscripcion al curso fue exitosa")
      },
      (error)=>{
        alert("No se pudo inscribir al curso")
      }
    )
  }

    
}
  





