import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../_services/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../_models/Usuario';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap';
import { Rol } from '../../_models/Rol';
import {FileUploadModule} from 'primeng/fileupload';
import { Message } from 'primeng/components/common/api';




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
  roles = ["DIRECTOR","FUNCIONARIO","ESTUDIANTE"];
  public rol:Rol;
  uploadedFiles: any[] = [];
  msgs: Message[] = [];

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
          rol:[''],
          foto:[]
      });
      
  }

  get f() { return this.registerForm.controls; }

  onSelect(event){
    console.log('entre al onSelect')
    let reader = new FileReader();
    if(event.files && event.files.length > 0) {
      console.log("entre al if dentro del onSelect")
      let file = event.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("estoy en el onload "+reader.result);
        this.usuario.foto = reader.result.toString();
      }
    }
  }


  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }

    alert('Se creara el Usuario\n\n' + JSON.stringify(this.registerForm.value['username']));
    console.log('on submitt con el usuario '+this.usuario.username+' y el pass '+this.usuario.password);
    console.log(this.rol.nombre);
    this.usuarioService.agregarUsuario(this.rol.nombre,this.usuario).subscribe(
      (data)=>{
        console.log(data)
        if (data.estado){
          //alert(data.mensaje);
          this.msgs = [];
            this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje});
          this.router.navigate(['administrador']);
        }else{
          //alert(data.mensaje);
          this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje});
        }
      }
    )
}

cancelar(){
  this.router.navigate(['/administrador']);
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