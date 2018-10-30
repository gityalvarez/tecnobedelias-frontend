import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarreraService } from 'src/app/_services/carrera.service';
import { Carrera } from 'src/app/_models/Carrera';
import { TokenStorage } from 'src/app/_helpers/TokenStorage';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { Usuario } from 'src/app/_models/Usuario';

@Component({
  selector: 'app-lista-carreras',
  templateUrl: './lista-carreras.component.html',
  styleUrls: ['./lista-carreras.component.css']
})
export class ListaCarrerasComponent implements OnInit {

  public carreras:Carrera[];
  public esDirector:boolean = false;
  public esEstudiante:boolean = false;
  public username: string;
  public carrerasEstudiante : Carrera[];
  //public estudiante: Usuario;
  //public largo:number;

  constructor(private router:Router,private carreraService:CarreraService, private tokenStorage : TokenStorage,
              private inscripcionService:InscripcionService, private usuarioService:UsuarioService ) { }

  ngOnInit() {
    this.esDirector = (this.tokenStorage.getRole() == "director");
    if (this.tokenStorage.getRole() == "estudiante"){
      this.esEstudiante = true;
      this.username = this.tokenStorage.getSubject();
      this.usuarioService.getEstudiante().subscribe(
        (estudiante)=>{
          this.carrerasEstudiante = estudiante.carreras;
        }
      )
    }
    this.carreraService.getCarreras().subscribe(
      (carreras)=>{
        this.carreras=carreras;
      },(error)=>{
        console.log(error);
      },
    ); 
  }

  agregarCarrera(){
    let carrera = new Carrera();
    this.carreraService.set(carrera);
    this.router.navigate(['director/carrera-form']);
  }  

  
  borrarCarrera(carrera){
    if(window.confirm('Seguro Quiere eliminar a '+carrera.nombre+"?")){
      this.carreraService.borrarCarrera(carrera).subscribe(
        (data)=>{
          if(data){
            alert("La carrera "+carrera.nombre+ " se elimino correctamente");
            this.carreras.splice(this.carreras.indexOf(carrera),1);
          }else{
            alert("No se pudo eliminar la carrera "+carrera.nombre);
          }
        }
      );
    }
  }

  editarCarrera(carrera){
    this.carreraService.set(carrera);
    this.router.navigate(['director/carrera-editar']);
  }

  inscripcionACarrera(carrera:Carrera){
    if(window.confirm('Seguro Quiere Inscribirse a la carrera '+carrera.nombre+"?")){
      this.inscripcionService.inscripcionACarrera(carrera).subscribe(
        (data)=>{
          if(data){
            alert("Se ha inscripto correctamente a la carrera "+carrera.nombre);
            this.carrerasEstudiante.push(carrera)
          }else{
            alert("No se pudo inscribir a la carrera "+carrera.nombre);
          }
        }
      );

    } 
  }

  desistirACarrera(carrera:Carrera){
    if(window.confirm('Seguro Quiere desistir a la carrera '+carrera.nombre+"?")){
      this.inscripcionService.desistirACarrera(carrera).subscribe(
        (data)=>{
          if(data){
            alert("Ha desistido correctamente de la carrera "+carrera.nombre);
            this.carrerasEstudiante.splice(this.carrerasEstudiante.indexOf(carrera),1);
          }else{
            alert("No pudo desistir de la carrera "+carrera.nombre);
          }
        }
      );

    } 

  }

  estaInscripto(carrera){
    let esta = false
    if (this.carrerasEstudiante){

      this.carrerasEstudiante.forEach(element=>{
        if (element.nombre == carrera.nombre){
          esta =true
        }
      })
      if(esta){
        return true
      }else return false

    }
  }

}
