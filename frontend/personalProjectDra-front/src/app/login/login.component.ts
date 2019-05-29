import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import {LoginService } from './login.service';
import { SignIn } from '../registration/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private navigationExtras : NavigationExtras;
  constructor(private router: Router, private loginService : LoginService, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if (params["User"] !== undefined){
        this.navigationExtras = params;
        this.user = params["User"];
      }
    });
  }
  public user : SignIn;
  public userType ;

  ngOnInit() { }

  login() : void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "UserType": this.userType
      }
    };

    if (this.user.Username=='admin' && this.user.Password=='adminAvenger11') {
      navigationExtras.queryParams["UserType"] = "admin";
      this.router.navigate(["adminView"], navigationExtras);
    } else {
      navigationExtras.queryParams["UserType"] = "user";
      this.loginService.login({
        Username : this.user.Username,
        Password : this.user.Password
      }).subscribe(
        data => {
          navigationExtras.queryParams["Id"] = data["Id"];
          navigationExtras.queryParams["Name"] = data["Name"];
          navigationExtras.queryParams["Surname"] = data["Surname"];
          navigationExtras.queryParams["Email"] = data["Email"];
          this.router.navigate(["bikedetail"], navigationExtras);
        },
        error => {
          alert("INVALID CREDENTIALS");
        }
        );

    }
  }
}