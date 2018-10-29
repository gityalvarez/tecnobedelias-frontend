import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { Usuario } from 'src/app/_models/Usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  estudiante : Usuario;
  registerForm: FormGroup;

  constructor(private usuarioService: UsuarioService,private formBuilder: FormBuilder) { 
    this.estudiante = new Usuario();
  }

  ngOnInit() {
    this.usuarioService.getEstudiante().subscribe(
      (estudiante)=>{
        this.estudiante = estudiante;
      }
    )

    this.registerForm = this.formBuilder.group({
      nombre: [Validators.required],
      apellido: [Validators.required],
      email: [[Validators.required, Validators.email]],
      username: [{value:'', disabled: true}],
      password: [[Validators.required, Validators.minLength(6)]],
      cedula: [{value:'', disabled: true}],
      fechaNacimiento: [],
      //rol:['']
    });
    

  }

  get f() { return this.registerForm.controls; }



}
