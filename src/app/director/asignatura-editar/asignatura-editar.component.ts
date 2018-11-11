import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { Asignatura } from 'src/app/_models/Asignatura';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-asignatura-editar',
  templateUrl: './asignatura-editar.component.html',
  styleUrls: ['./asignatura-editar.component.css']
})
export class AsignaturaEditarComponent implements OnInit {
public asignatura : Asignatura;
msgs: Message[] = [];

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
      (data)=>{
        if(data.estado){
          //alert(data.mensaje)
          this.msgs = [];
          this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje});
          this.router.navigate(['/director']);
        }else{
          //alert(data.mensaje)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje});
        }
    },
    (error)=>console.log(error)
    )
  }


}
