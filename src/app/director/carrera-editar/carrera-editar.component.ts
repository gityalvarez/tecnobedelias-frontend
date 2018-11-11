import { Component, OnInit } from '@angular/core';
import { CarreraService } from 'src/app/_services/carrera.service';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/_models/Carrera';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-carrera-editar',
  templateUrl: './carrera-editar.component.html',
  styleUrls: ['./carrera-editar.component.css']
})
export class CarreraEditarComponent implements OnInit {
  public carrera : Carrera;
  msgs: Message[] = [];

  constructor(private carreraService : CarreraService, private router : Router) { }

  ngOnInit() {
    this.carrera = this.carreraService.get()
  }

  cancelar(){
    this.router.navigate(['/director']);
  }

  editar(){
    this.carreraService.modificarCarrera(this.carrera).subscribe(
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
