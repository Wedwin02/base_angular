import { Injectable } from '@angular/core';
import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PacienteI } from '../../modelos/pacienteId.interface';
import { ListapacientesI } from '../../modelos/listapacientes.interface';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
@Injectable({
  providedIn: 'root'
})

export class ApiService {

  url:string = "http://localhost/curso_apirest/";

  constructor(private http:HttpClient) { 

  }


  //Login
  loginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion = this.url + "auth";
    return this.http.post<ResponseI>(direccion,form);
  }

  //Get All Pacientes
  getAllPacientes(page:number):Observable<ListapacientesI[]>{
    let dirreccion = this.url + "pacientes?page=$" + page ;
    return this.http.get<ListapacientesI[]>(dirreccion);
  }

  // Get Paciente id
  getpacienteId(id):Observable<PacienteI>{
    let direccion = this.url +"pacientes?id=" + id;
    return this.http.get<PacienteI>(direccion);
  }
  // Update 
  putPaciente(form:PacienteI):Observable<ResponseI>{
    let direccion = this.url +"pacientes";
    return this.http.put<ResponseI>(direccion,form);
  }

  // delete
  deletePaciente(form:PacienteI):Observable<ResponseI>{
    let direccion = this.url +"pacientes";
    let Options = {
      headers: new HttpHeaders({
        'Conten-type':'application/json'
      }),
      body:form
    }
    return this.http.delete<ResponseI>(direccion,Options);
  }

  // Insert 
  insertPaciente(form:PacienteI):Observable<ResponseI>{
    let direccion = this.url +"pacientes";
    return this.http.post<ResponseI>(direccion,form);
  }
}
