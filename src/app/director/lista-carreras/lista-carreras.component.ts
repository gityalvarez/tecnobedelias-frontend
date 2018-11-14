import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarreraService } from 'src/app/_services/carrera.service';
import { Carrera } from 'src/app/_models/Carrera';
import { TokenStorage } from 'src/app/_helpers/TokenStorage';
import { InscripcionService } from 'src/app/_services/inscripcion.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { Usuario } from 'src/app/_models/Usuario';
import { Message } from 'primeng/components/common/api';

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
  msgs: Message[] = [];

  //public estudiante: Usuario;
  //public largo:number;

  constructor(private router:Router,private carreraService:CarreraService, private tokenStorage : TokenStorage,
              private inscripcionService:InscripcionService, private usuarioService:UsuarioService) { }

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
          if(data.estado){
            //alert(data.mensaje);
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje });
            this.carreras.splice(this.carreras.indexOf(carrera),1);
          }else{
            //alert(data.mensaje);
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje });
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
          if(data.estado){
            //alert(data.mensaje);
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje });            
            this.carrerasEstudiante.push(carrera)
            
          }else{
            //alert(data.mensaje);
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje });
          }
        }
      );

    } 
  }

  desistirACarrera(carrera:Carrera){
    if(window.confirm('Seguro Quiere desistir a la carrera '+carrera.nombre+"?")){
      this.inscripcionService.desistirACarrera(carrera).subscribe(
        (data)=>{
          if(data.estado){
            //alert(data.mensaje);
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje });
            this.carrerasEstudiante.splice(this.carrerasEstudiante.indexOf(carrera),1);
            //this.router.navigate(['estudiante'])

          }else{
            //alert(data.mensaje);
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje });
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
