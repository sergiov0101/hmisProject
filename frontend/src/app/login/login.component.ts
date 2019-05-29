import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private loginService : LoginService) { }
  username: string;
  password: string;
  userType: string;
  id: string;

  ngOnInit() { }

  login() : void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "UserType": this.userType,
          "Id" : this.id
      }
    };

    if (this.username=='admin' && this.password=='adminAvenger11') {
      navigationExtras.queryParams["UserType"] = "admin";
      this.router.navigate(["adminView"], navigationExtras);
    } else {
      navigationExtras.queryParams["UserType"] = "user";
      this.loginService.login({
        Username : this.username,
        Password : this.password
      }).subscribe(
        data => {
          navigationExtras.queryParams["Id"] = data["Id"];
          navigationExtras.queryParams["Name"] = data["Name"];
          navigationExtras.queryParams["Surname"] = data["Surname"];
          navigationExtras.queryParams["Email"] = data["Email"];
          this.router.navigate(["mainBikesView"], navigationExtras);
        },
        error => {
          alert("INVALID CREDENTIALS");
        }
        );

    }
  }
}