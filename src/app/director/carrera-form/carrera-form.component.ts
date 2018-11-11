import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarreraService } from 'src/app/_services/carrera.service';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/_models/Carrera';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-carrera-form',
  templateUrl: './carrera-form.component.html',
  styleUrls: ['./carrera-form.component.css']
})

  
export class CarreraFormComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  public carrera:Carrera;
  msgs: Message[] = [];

  

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

  
  cancelar(){
    this.router.navigate(['/director']);
  }

  onSubmit(){
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    
    console.log('on submitt con el usuario '+this.carrera.nombre);
    
    this.carreraService.agregarCarrera(this.carrera).subscribe(
      (data)=>{
        if (data.estado){
          //alert(data.mensaje);
          this.msgs = [];
          this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje});

          this.router.navigate(['director']);
        }else{
          //alert(data.mensaje);
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje});

        }
      }
    )
  }




}
