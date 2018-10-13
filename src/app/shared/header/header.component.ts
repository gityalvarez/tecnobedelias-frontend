import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../_helpers/TokenStorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private username :string;
  constructor(private tokenStorage:TokenStorage,private router:Router) { }

  ngOnInit() {
    this.username = this.tokenStorage.getSubject().toUpperCase();
    console.log('el username es '+this.username);
  }


  logout():void{
    this.tokenStorage.signOut();
  }
}
