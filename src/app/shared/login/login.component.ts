import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorage } from '../../_helpers/TokenStorage';
import {Router} from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  alert = false

  constructor(private router:Router, private authServ:AuthService,private tokenStorage:TokenStorage) { }

  ngOnInit() {
  }

  username:string;
  password:string;

  login():void{
    this.authServ.auth(this.username,this.password).subscribe(
      (data)=>{
          if(data.headers.get('Authorization') != null){
            this.tokenStorage.saveToken(data.headers.get('Authorization'));
            const role = this.tokenStorage.getRole();
            this.router.navigate([role]);
          }/*else{
            console.log('usuario no registrado')
            this.password=''
            this.username=''
            this.alert = true
          }*/
        },
        (error)=>{
          this.password=''
            this.username=''
            this.alert = true

        }

    )}
    
  }

