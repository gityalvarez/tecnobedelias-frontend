import { Component, OnInit } from '@angular/core';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { TokenStorage } from 'src/app/_helpers/TokenStorage';
import { Curso } from 'src/app/_models/Curso';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { Usuario } from 'src/app/_models/Usuario';
import { CarreraService } from 'src/app/_services/carrera.service';
import { Carrera } from 'src/app/_models/Carrera';
import { Asignatura } from 'src/app/_models/Asignatura';
import { element } from '@angular/core/src/render3/instructions';

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
cursosEstudiante:Curso[];

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
        //console.log('obtuve el estudiante '+estudiante.username)
      }
    );
    this.inscripcionService.consultaCursos().subscribe(
      (cursos)=>{
        this.cursosEstudiante = cursos
      }
    )

  }

  inscripcionACurso(curso:Curso){
    this.inscripcionService.inscripcionACurso(curso).subscribe(
      (data)=>{
        alert("La inscripcion al curso fue exitosa")
        this.cursosEstudiante.push(curso)
      },
      (error)=>{
        alert("No se pudo inscribir al curso")
      }
    )
  }

  desistirACurso(curso:Curso){
    this.inscripcionService.desistirACurso(curso).subscribe(
      (data)=>{
        alert("Pudo desistir del curso correctamente")
        this.cursosEstudiante.splice(this.cursosEstudiante.indexOf(curso),1)
      },
      (error)=>{
        alert("No pudo desistir del curso")
      }
    )
  }

  estaInscripto(curso){
    let esta = false
    this.cursosEstudiante.forEach(element=>{
      if (element.id == curso.id){
        esta =true
      }
    })
    if(esta){
      return true
    }else return false
  }


    
}
  





