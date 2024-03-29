import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router';
import { ListapacientesI } from '../../modelos/listapacientes.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {

  pacientes:ListapacientesI[];
  constructor(private api:ApiService, private router:Router){

  }

 ngOnInit(): void{

  this.api.getAllPacientes(1).subscribe(data=>{
    this.pacientes = data;
  });

 }
 editarPaciente(id){
  this.router.navigate(['editar',id]);
 }

 nuevoPaciente(){
  this.router.navigate(['nuevo']);
 }


}
