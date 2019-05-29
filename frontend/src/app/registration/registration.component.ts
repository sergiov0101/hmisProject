import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {SignIn} from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  private signInModel : SignIn;
  private navigationExtras: NavigationExtras = {
    queryParams: {
        "SignIn": this.signInModel
    }
  };

  signIn() : void {
       //peticion de signin, en caso satisfactorio, pasamos a la vista de login 
       this.router.navigate(["login"], this.navigationExtras);
  }

}
