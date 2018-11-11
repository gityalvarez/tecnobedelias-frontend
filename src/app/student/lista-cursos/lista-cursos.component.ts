import { Component, OnInit, TemplateRef } from '@angular/core';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { TokenStorage } from 'src/app/_helpers/TokenStorage';
import { Curso } from 'src/app/_models/Curso';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { Usuario } from 'src/app/_models/Usuario';
import { CarreraService } from 'src/app/_services/carrera.service';
import { Carrera } from 'src/app/_models/Carrera';
import { Asignatura } from 'src/app/_models/Asignatura';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { hypenatePropsObject } from '@angular/animations/browser/src/render/shared';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit {
  modalRef: BsModalRef;

carreras : Carrera[];
carrera : Carrera;
asignaturas : Asignatura[];
asignatura: Asignatura;
cursos : Curso[];
curso : Curso;
username:string;
estudiante:Object;
cursosEstudiante:Curso[];
customClass: string = 'panel-success';
fecha = Date.now()
hoy = new Date(this.fecha).toISOString();
msgs: Message[] = [];


constructor(private inscripcionService : InscripcionService,private carreraService : CarreraService,
                     private usuarioService:UsuarioService,private tokenStorage:TokenStorage,
                     private modalService:BsModalService) { }

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
        if(data.estado){

          //alert(data.mensaje)
          this.msgs = [];
          this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje});

          this.cursosEstudiante.push(curso)

        }
        else{
          //alert(data.mensaje)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje});

        }
      },
      (error)=>{
        alert("No se pudo inscribir al curso")
      }
    )
  }

  desistirACurso(curso:Curso){
    this.inscripcionService.desistirACurso(curso).subscribe(
      (data)=>{
        if(data.estado){

          //alert(data.mensaje)
          this.cursosEstudiante.splice(this.cursosEstudiante.indexOf(curso),1)
          this.msgs = [];
          this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje});

        }else{
          //alert(data.mensaje)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje});

        }
      },
      (error)=>{
        alert("No pudo desistir del curso")
      }
    )
  }

  

  estaInscripto(curso){
    let esta = false
    if(this.cursosEstudiante){

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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }



    
}
  





