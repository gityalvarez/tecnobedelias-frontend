import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchOtherValidator } from 'src/app/_helpers/match-other-validator';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  password:String;
  passwordConfirm:String;
  token:String;
  constructor(private formBuilder: FormBuilder, private usuarioService:UsuarioService,private activatedRoute:ActivatedRoute,private route:Router) { }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');
    this.registerForm = this.formBuilder.group({
   
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6),matchOtherValidator('password')]],
    
  });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
        return;
    }
    this.usuarioService.cambiarPassword(this.password,this.token).subscribe(
      (data)=>{
        console.log(data);
        this.route.navigate(['']);
      },
      (error)=>{console.log(error)}
    );
    
  }

}
