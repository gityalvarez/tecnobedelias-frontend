import { Component, OnInit } from '@angular/core';
import { CarreraService } from 'src/app/_services/carrera.service';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/_models/Carrera';

@Component({
  selector: 'app-carrera-editar',
  templateUrl: './carrera-editar.component.html',
  styleUrls: ['./carrera-editar.component.css']
})
export class CarreraEditarComponent implements OnInit {
  public carrera : Carrera;
  constructor(private carreraService : CarreraService, private router : Router) { }

  ngOnInit() {
    this.carrera = this.carreraService.get()
  }

  cancelar(){
    this.router.navigate(['/director']);
  }

  editar(){
    this.carreraService.modificarCarrera(this.carrera).subscribe(
      (data)=>{console.log('pude modificar '+data)
      this.router.navigate(['/director']);
    },
    (error)=>console.log(error)
    )
  }
}
