import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Asignatura } from 'src/app/_models/Asignatura';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { Router } from '@angular/router';
import {CheckboxModule} from 'primeng/checkbox';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-asignatura-form',
  templateUrl: './asignatura-form.component.html',
  styleUrls: ['./asignatura-form.component.css']
})
export class AsignaturaFormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  public asignatura:Asignatura;
  msgs: Message[] = [];


  constructor(private formBuilder:FormBuilder,private asignaturaService:AsignaturaService, private router:Router) {
    this.asignatura= new Asignatura();
    this.asignatura.taller = false;

   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre:['',Validators.required],
      descripcion:[''],
      //codigo:['',Validators.required],
      taller:['']
    });
  }

  get f() { return this.registerForm.controls; }

  cancelar(){
    this.router.navigate(['/director']);
  }

  onSubmit(){
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    alert('Se creara la Asignatura\n\n' + JSON.stringify(this.registerForm.value['nombre']));
    console.log('on submitt con el usuario '+this.asignatura.nombre);
    
    this.asignaturaService.agregarAsignatura(this.asignatura).subscribe(
      (data)=>{
        if(data.estado){
          //alert(data.mensaje)
          //console.log(this.asignatura);
          this.msgs = [];
          this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje});
          this.router.navigate(['director']);
        }else{
          //alert(data.mensaje)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje});
        }
      }
    )
  }

}
