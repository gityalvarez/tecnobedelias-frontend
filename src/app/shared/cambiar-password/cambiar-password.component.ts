import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { matchOtherValidator } from 'src/app/_helpers/match-other-validator';
import { Router } from '@angular/router';
import { TokenStorage } from 'src/app/_helpers/TokenStorage';
import { Message } from 'primeng/components/common/api';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  passwordActual:String;
  password:String;
  passwordConfirm:String;
  msgs: Message[] = [];


  constructor(private formBuilder: FormBuilder, private usuarioService:UsuarioService,private route:Router, private token:TokenStorage) { }

  ngOnInit() {


    this.registerForm = this.formBuilder.group({
      passwordActual: ['',[Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6),matchOtherValidator('password')]],
    
  });
  }

  get f() {
     return this.registerForm.controls; 
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }
    this.usuarioService.modificarPassword(this.passwordActual,this.password,this.passwordConfirm).subscribe(
      (data)=>{
        if(data.estado){
          this.msgs = [];
              this.msgs.push({severity:'success', summary:'Exito', detail:data.mensaje});
          this.token.getRole
          this.route.navigate([this.token.getRole()]);

        }else{
          this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:data.mensaje});
        }
      },
      (error)=>{console.log(error)}
    );
    
  }

}
