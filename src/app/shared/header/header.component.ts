import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../_helpers/TokenStorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public username :string;
  public rol : string;
  
  constructor(private tokenStorage:TokenStorage,private router:Router) { }

  ngOnInit() {
    this.username = this.tokenStorage.getSubject().toUpperCase();
    this.rol = this.tokenStorage.getRole();
  }


  logout():void{
    this.tokenStorage.signOut();
  }
}
