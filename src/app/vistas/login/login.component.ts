import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { LoginI } from '../../modelos/login.interface';
import { ResponseI } from '../../modelos/response.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
   loginForm = new FormGroup({
    usuario : new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
   })

   constructor(private api:ApiService,private router:Router){

   }
   //Variables de errores
   errorStatus:boolean = false;
   errorMsj: any = "";

   ngOnInit(): void {
    
    this.checkLocalStorage();
   }
   //Consulta si hay una session activa
   checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
   }
   onLogin(form:any){
     this.api.loginByEmail(form).subscribe(data =>{
      let dataResponse:ResponseI = data;
      if(dataResponse.status == "ok"){
        localStorage.setItem("token",dataResponse.result.token);
        this.router.navigate(['dashboard']);
      }else{
        this.errorStatus = true;
        this.errorMsj = dataResponse.result.error_msg;
      }
     });

   }
}
