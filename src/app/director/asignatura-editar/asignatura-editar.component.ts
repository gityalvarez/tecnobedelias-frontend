import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { Asignatura } from 'src/app/_models/Asignatura';
import { Router } from '@angular/router';
import {Location} from '@angular/common'

@Component({
  selector: 'app-asignatura-editar',
  templateUrl: './asignatura-editar.component.html',
  styleUrls: ['./asignatura-editar.component.css']
})
export class AsignaturaEditarComponent implements OnInit {
private asignatura : Asignatura;
  constructor(private asignaturaService:AsignaturaService, private router : Router) { }

  ngOnInit() {
    this.asignatura = this.asignaturaService.get()
    console.log(this.asignatura)
  }

  cancelar(){
    this.router.navigate(['/director']);
  }

  editar(){
    this.asignaturaService.modificarAsignatura(this.asignatura).subscribe(
      (data)=>{console.log('pude modificar '+data)
      this.router.navigate(['/director']);
    },
    (error)=>console.log(error)
    )
  }


}
