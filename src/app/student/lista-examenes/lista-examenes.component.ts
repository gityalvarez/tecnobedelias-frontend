import { Component, OnInit, TemplateRef } from '@angular/core';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { CarreraService } from 'src/app/_services/carrera.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { TokenStorage } from 'src/app/_helpers/TokenStorage';
import { Examen } from 'src/app/_models/Examen';
import { Asignatura } from 'src/app/_models/Asignatura';
import { Carrera } from 'src/app/_models/Carrera';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-lista-examenes',
  templateUrl: './lista-examenes.component.html',
  styleUrls: ['./lista-examenes.component.css']
})
export class ListaExamenesComponent implements OnInit {

  modalRef: BsModalRef;

  carreras : Carrera[];
  carrera : Carrera;
  asignaturas : Asignatura[];
  asignatura: Asignatura;
  examenes : Examen[];
  examen : Examen;
  username:string;
  estudiante:Object;
  examenesEstudiante:Examen[];
  fecha = Date.now()
  hoy = new Date(this.fecha).toISOString();

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
      }
    );

    this.inscripcionService.consultaExamen().subscribe(
      (examenes)=>{
        this.examenesEstudiante = examenes
      }
    )
  }

  inscripcionAExamen(examen:Examen){
    this.inscripcionService.inscripcionAExamen(examen).subscribe(
      (data)=>{
        if (data.estado){

          alert(data.mensaje)
          this.examenesEstudiante.push(examen)
        }else{
          alert(data.mensaje)
        }
      },
      (error)=>{
        alert("No se pudo inscribir al examen")
      }
    )
  }

  desistirACurso(examen:Examen){
    this.inscripcionService.desistirAExamen(examen).subscribe(
      (data)=>{
        if(data.estado){

          alert(data.mensaje)
          this.examenesEstudiante.splice(this.examenesEstudiante.indexOf(examen),1)
        }else{
          alert(data.mensaje)
        }
      },
      (error)=>{
        alert("No pudo desistir del curso")
      }
    )
  }

  estaInscripto(examen){
    let esta = false
    if (this.examenesEstudiante){
      this.examenesEstudiante.forEach(element=>{
        if (element.id == examen.id){
          esta =true
        }
      })

    }
    if(esta){
      return true
    }else return false
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
