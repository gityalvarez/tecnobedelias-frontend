import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { Usuario } from 'src/app/_models/Usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  estudiante : Usuario;
  registerForm: FormGroup;
  submitted = false;

  constructor(private usuarioService: UsuarioService,private formBuilder: FormBuilder, private router:Router) { 
    this.estudiante = new Usuario();
  }

  ngOnInit() {
    this.usuarioService.getEstudiante().subscribe(
      (estudiante)=>{
        this.estudiante = estudiante;
      }
    )

    this.registerForm = this.formBuilder.group({
      nombre: [{value:'', disabled: true}],
      apellido: [{value:'', disabled: true}],
      email: [{value:'', disabled: true}],
      username: [{value:'', disabled: true}],
      password: [{value:'', disabled: true}],
      cedula: [{value:'', disabled: true}],
      //fechaNacimiento: [{value:'', disabled: true}],
      foto: []
      //rol:['']
    });
    

  }

  get f() { return this.registerForm.controls; }

  cancelar(){
    this.router.navigate(['/director']);
  }


  onSelect(event){
    console.log('entre al onSelect')
    let reader = new FileReader();
    if(event.files && event.files.length > 0) {
      console.log("entre al if dentro del onSelect")
      let file = event.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("estoy en el onload "+reader.result);
        this.estudiante.foto = reader.result.toString();
      }
    }
  }










  /*onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    //alert('Se creara el Usuario\n\n' + JSON.stringify(this.registerForm.value['username']));
    //console.log('on submitt con el usuario '+this.usuario.username+' y el pass '+this.usuario.password);
    //console.log(this.rol.nombre);
    this.usuarioService.modificarUsuario(this.estudiante).subscribe(
      (usuario)=>{
        console.log(usuario);
        this.router.navigate(['administrador']);
      }
    )
}*/



}
