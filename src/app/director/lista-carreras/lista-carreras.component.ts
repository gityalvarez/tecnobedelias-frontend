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
  //public carrerasEstudiante : Carrera[];
  //public estudiante: Usuario;
  //public largo:number;

  constructor(private router:Router,private carreraService:CarreraService, private tokenStorage : TokenStorage,
              private inscripcionService:InscripcionService, private usuarioService:UsuarioService ) { }

  ngOnInit() {
    this.esDirector = (this.tokenStorage.getRole() == "director");
    if (this.tokenStorage.getRole() == "estudiante"){
      this.esEstudiante = true;
      this.username = this.tokenStorage.getSubject();
      /*this.usuarioService.getEstudiante().subscribe(
        (estudiante)=>{
          this.carrerasEstudiante = estudiante.carreras;
          this.largo = this.carrerasEstudiante.length;
          this.estudiante = estudiante;
        }
      )*/
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
    console.log('entre al borrarCarrera del lista Carreras con la carrera '+carrera.nombre);
    if(window.confirm('Seguro Quiere eliminar a '+carrera.nombre+"?")){
      this.carreraService.borrarCarrera(carrera).subscribe(
        (data)=>{
          if(data){
            alert("La carrera "+carrera.nombre+ " se elimino correctamente");
            console.log('a la vuelta del suscribe');
            this.carreras.splice(this.carreras.indexOf(carrera),1);
          }else{
            alert("No se pudo eliminar la carrera "+carrera.nombre);
          }
        }
      );
    }
  }

  inscripcionACarrera(carrera:Carrera){
    if(window.confirm('Seguro Quiere Inscribirse a la carrera '+carrera.nombre+"?")){
      console.log("Usuario "+this.username)
      this.inscripcionService.inscripcionACarrera(carrera).subscribe(
        (data)=>{
          if(data){
            alert("Se ha inscripto correctamente a la carrera "+carrera.nombre);
            console.log('a la vuelta del suscribe');
          }else{
            alert("No se pudo inscribir a la carrera "+carrera.nombre);
          }
        }
      );

    } 
  }

  desistirACarrera(carrera:Carrera){
    if(window.confirm('Seguro Quiere desistir a la carrera '+carrera.nombre+"?")){
      console.log("Usuario "+this.username)
      this.inscripcionService.desistirACarrera(carrera).subscribe(
        (data)=>{
          if(data){
            alert("Ha desistido correctamente de la carrera "+carrera.nombre);
            console.log('a la vuelta del suscribe');
          }else{
            alert("No pudo desistir de la carrera "+carrera.nombre);
          }
        }
      );

    } 

  }

}
