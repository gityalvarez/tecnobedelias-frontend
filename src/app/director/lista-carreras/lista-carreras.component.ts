import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarreraService } from 'src/app/_services/carrera.service';
import { Carrera } from 'src/app/_models/Carrera';

@Component({
  selector: 'app-lista-carreras',
  templateUrl: './lista-carreras.component.html',
  styleUrls: ['./lista-carreras.component.css']
})
export class ListaCarrerasComponent implements OnInit {

  public carreras:Carrera[];

  constructor(private router:Router,private carreraService:CarreraService) { }

  ngOnInit() {
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
          console.log('a la vuelta del suscribe');
          this.carreras.splice(this.carreras.indexOf(carrera),1);
        }
      );
    }
  }

}
