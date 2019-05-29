import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {SignIn, RegistrationService} from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private router : Router, private service : RegistrationService) { }

  ngOnInit() {
  }

  public user : SignIn = {
    Name: '',
    Surname : "",
    Email :"",
    Username : "",
    Password : ""
  };

  private navigationExtras: NavigationExtras = {
    queryParams: {
        "User": this.user
    }
  };

  register() : void {
       this.service.createUser(this.user).subscribe(data => {
         console.log("DATA L ", data);
       });
      // this.router.navigate(["login"], this.navigationExtras);
  }

}


