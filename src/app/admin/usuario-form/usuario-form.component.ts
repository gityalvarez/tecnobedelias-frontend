import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../_services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../_models/Usuario';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap';
import { Rol } from '../../_models/Rol';



@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {  
  registerForm: FormGroup;
  submitted = false;
  public usuario:Usuario;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  roles = ["ADMINISTRADOR","DIRECTOR","FUNCIONARIO","ESTUDIANTE"];
  public rol:Rol;
  constructor(private formBuilder: FormBuilder,private usuarioService:UsuarioService,private router: Router) {
    this.usuario = new Usuario();
    this.rol= new Rol();
    
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.dateInputFormat = 'YYYY/MM/DD';
    this.dpConfig.maxDate = new Date('2000/01/01');
   }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          nombre: ['', Validators.required],
          apellido: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          username: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          cedula: ['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
          fechaNacimiento: [''],
          rol:['']
      });
      
  }

  get f() { return this.registerForm.controls; }



  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    alert('Se creara el Usuario\n\n' + JSON.stringify(this.registerForm.value['username']));
    console.log('on submitt con el usuario '+this.usuario.username+' y el pass '+this.usuario.password);
    console.log(this.rol.nombre);
    this.usuarioService.agregarUsuario(this.rol.nombre,this.usuario).subscribe(
      (usuario)=>{
        console.log(usuario);
        this.router.navigate(['administrador']);
      }
    )
}

}





































/*




  registerForm: FormGroup;
  submitted = false;
  private usuario:Usuario;


  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(private usuarioService:UsuarioService,private router:Router, private formBuilder: FormBuilder) { 
    this.dpConfig.containerClass = 'theme-dark-blue';
    this.dpConfig.dateInputFormat = 'YYYY/MM/DD';
    //this.dpConfig.dateInputFormat = 'L';
    //this.dpConfig.yearLabel= 'Ano'
  }

  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cedula: ['', Validators.required],
      fechaNacimiento: []
    });
    
    this.usuario = new Usuario();

  }

  get f() { 
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('Usuario '+this.usuario.username+ ' creado');
    console.log('on submitt con el usuario '+this.usuario.username+' y el pass '+this.usuario.password);
    this.usuarioService.agregarUsuario(this.usuario).subscribe(
      (usuario)=>{
        console.log(usuario);
        this.router.navigate(['administrador']);
      }
    )
  }

  

}
*/