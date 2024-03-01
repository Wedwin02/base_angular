import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup ,Validator} from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { AlertasService } from '../../servicios/alertas/alertas.service';
import { ResponseI } from '../../modelos/response.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})


export class NuevoComponent implements OnInit {
  
  nuevoForm= new FormGroup({
    pacienteId: new FormControl(''),
    nombre: new FormControl(''),
    dni: new FormControl(''),
    telefono: new FormControl(''),
    correo: new FormControl(''),
    direccion: new FormControl(''),    
    codigoPostal: new FormControl(''),
    genero: new FormControl(''),
    fechanacimiento: new FormControl(''),
    token: new FormControl('')
  
  });
  constructor(private api:ApiService, private router:Router,private alerta:AlertasService){}

  ngOnInit(): void {
    let token =localStorage.getItem('token');
    this.nuevoForm.patchValue({
      'token':token
    });
   
  }
  postForm(form:any){
    this.api.insertPaciente(form).subscribe(data=>{
      let respuesta:ResponseI = data;
      if(respuesta.status = "ok"){
        this.alerta.showSuccess('Datos modificados','Hecho');
        this.router.navigate(['dashboard']);
      }else{
        this.alerta.showError(respuesta.result.console.error_msg,'Error');
      }
  })
  }
}
