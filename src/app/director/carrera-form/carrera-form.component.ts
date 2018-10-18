import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarreraService } from 'src/app/_services/carrera.service';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/_models/Carrera';

@Component({
  selector: 'app-carrera-form',
  templateUrl: './carrera-form.component.html',
  styleUrls: ['./carrera-form.component.css']
})

  
export class CarreraFormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  public carrera:Carrera;
  

  constructor(private formBuilder:FormBuilder,private carreraService:CarreraService, private router:Router) { 
    this.carrera= new Carrera();

  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      nombre:['',Validators.required],
      descripcion:[''],
      creditosMinimos:['',Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    
    console.log('on submitt con el usuario '+this.carrera.nombre);
    
    this.carreraService.agregarCarrera(this.carrera).subscribe(
      (carrera)=>{
        if (carrera){
          alert('Se creo la Carrera\n\n' + JSON.stringify(this.registerForm.value['nombre']));
          this.router.navigate(['director']);
        }else{
          alert('No se pudo crear la  Carrera\n\n' + JSON.stringify(this.registerForm.value['nombre']));
          this.registerForm.reset();
        }
      }
    )
  }




}
