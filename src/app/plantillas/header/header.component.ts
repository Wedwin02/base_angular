import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router){}
  Inicio(){
    this.router.navigate(['dashboard']);
  }

  CerrarSeccion(){
    let token = this.getToken();
    localStorage.removeItem(token);
    localStorage.clear();
    this.router.navigate(['login']);

  }
  getToken(){
    return localStorage.getItem('token');
  }

}


