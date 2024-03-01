import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { PacienteI } from '../../modelos/pacienteId.interface';
import { FormGroup,FormControl,Validator } from '@angular/forms';
import { ResponseI } from '../../modelos/response.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent  implements OnInit{
  constructor(private activaterouter:ActivatedRoute, private router:Router, private api:ApiService,private alerta:AlertasService){

  }


  datosPaciente:PacienteI;
  editarForm= new FormGroup({
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

  ngOnInit(): void {
    let pacienteid = this.activaterouter.snapshot.paramMap.get('id');
    let token = this.getToken();
    this.api.getpacienteId(pacienteid).subscribe(data=>{
      this.datosPaciente = data[0];
      this.editarForm.setValue({
        'pacienteId': this.datosPaciente.PacienteId,
        'nombre': this.datosPaciente.Nombre,
        'dni': this.datosPaciente.DNI,
        'telefono': this.datosPaciente.Telefono,
        'correo': this.datosPaciente.Correo,        
        'direccion': this.datosPaciente.Direccion,
        'codigoPostal': this.datosPaciente.CodigoPostal,
        'genero': this.datosPaciente.Genero,
        'fechanacimiento': this.datosPaciente.FechaNacimiento,
        'token': token        

      });
    })
  }
  getToken(){
    return localStorage.getItem('token');
  }

  //Update paciente
  postForm(form:any){
    this.api.putPaciente(form).subscribe(data=>{
      let respuesta:ResponseI = data;
      if(respuesta.status = "ok"){
        this.alerta.showSuccess('Datos modificados','Hecho');
        this.router.navigate(['dashboard']);
      }else{
        this.alerta.showError(respuesta.result.console.error_msg,'Error');
      }
    })
  }

  eliminar(){
    let datos:any = this.editarForm.value;
    this.api.deletePaciente(datos).subscribe(data=>{
      let respuesta:ResponseI = data;
      if(respuesta.status = "ok"){
        this.alerta.showSuccess('Datos Eliminados','Hecho');
        this.router.navigate(['dashboard']);
      }else{
        this.alerta.showError(respuesta.result.console.error_msg,'Error');
      }
    })
  }
}
