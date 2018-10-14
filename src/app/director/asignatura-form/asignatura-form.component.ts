import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Asignatura } from 'src/app/_models/Asignatura';
import { AsignaturaService } from 'src/app/_services/asignatura.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignatura-form',
  templateUrl: './asignatura-form.component.html',
  styleUrls: ['./asignatura-form.component.css']
})
export class AsignaturaFormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  private asignatura:Asignatura;

  constructor(private formBuilder:FormBuilder,private asignaturaService:AsignaturaService, private router:Router) {
    this.asignatura= new Asignatura();

   }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre:['',Validators.required],
      descripcion:[''],
      codigo:['',Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    alert('Se creara la Asignatura\n\n' + JSON.stringify(this.registerForm.value['nombre']));
    console.log('on submitt con el usuario '+this.asignatura.nombre);
    
    this.asignaturaService.agregarAsignatura(this.asignatura).subscribe(
      (asignatura)=>{
        console.log(this.asignatura);
        this.router.navigate(['director']);
      }
    )
  }

}
