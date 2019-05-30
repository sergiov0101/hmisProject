import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {SignIn, RegistrationService} from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public emailError = false;
  public passError = false;
  public Password2 ="";
  public auxMsj ="";
  constructor(private router : Router, private service : RegistrationService) { }

  ngOnInit() {
  }

  public user : SignIn = {
    
    Name: '',
    Surname : "",
    Email :"",
    Username : "",
    Password : "",
  };

  private navigationExtras: NavigationExtras = {
    queryParams: {
        "User": this.user
    }
  };

  register() : void {
    let campoError:boolean = false;
      this.emailError = false;
      this.passError = false;


      if (!this.checkEmail(this.user.Email)){
        this.emailError = true;
        campoError = true;
      }
      if(!this.checkPassword(this.user.Password,this.Password2)){
        this.passError = true;
        campoError = true;
       // passErrorMsj : string ='dddd';
      }


      if (!campoError){
        this.service.createUser(this.user).subscribe(data => {
          console.log("DATA L ", data);
        });
        this.router.navigate(["login"], this.navigationExtras);
      }
  }
  // comprobacion del email
  private checkEmail(email) {
    //expresion regular
    var patt = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var res = patt.test(email);
    return res;
  }
  //comprobaciones del password
  private checkPassword(Password1,Password2){
    var patt = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/);
    var res = patt.test(Password1);
    console.log(Password1);
    console.log(Password2);
    if(!res){
      this.auxMsj = "Formato de contraseña no válido [Debe contener mínimo 6 cáracteres,mayuscula,minuscula y un caracter especial]";
      return false;
    }else if (!(Password1===Password2)){
      this.auxMsj= "Contraseñas no coinciden";
      return false;
    }
    return true;
  }

}


