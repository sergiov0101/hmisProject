import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import {LoginService, Login } from './login.service';
import {AppComponent} from '../app.component';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private navigationExtras : NavigationExtras;
  constructor(private router: Router, private loginService : LoginService, private route: ActivatedRoute, private app : AppComponent) { 
   /* this.route.queryParams.subscribe(params => {
      if (params["User"] !== undefined){
        this.navigationExtras = params;
        this.user = params["User"];
      }
    });*/
    
  }
  public user : Login = {
    Username : "",
    Password : ""
  };
  public userType ;

  ngOnInit() {
    this.app.SetShowNavLogin(true);
    this.app.setShowNavDrop(false);
    this.app.resetActivenavs();
    this.app.activeNavLogin = true;
    //activeNavElem:false;
   }

  public showDiv = false;
  public vBarraInicio = false;
  login() : void {
    
    this.showDiv=false;
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "UserType": this.userType
      }
    };

    if (this.user.Username=='admin' && this.user.Password=='adminAvenger11') {
      navigationExtras.queryParams["UserType"] = "admin";
      navigationExtras.queryParams["UserName"] = "Administrator";
      this.app.SetShowNavLogin(false);
      this.app.showUsername(this.user.Username);
      $('#loginOk').modal('show');
      setTimeout(() => {
        this.router.navigate(["adminView"], navigationExtras);
        $('#loginOk').modal('hide');
      }, 1000)
 
            
      
 
    } else {
      console.log("",this.user)
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
          
        navigationExtras.queryParams["UserName"] = this.user.Username;
          this.app.SetShowNavLogin(false);
          this.app.showUsername(this.user.Username);
          $('#loginOk').modal('show');
          setTimeout(() => {
            this.router.navigate(["bikedetail"], navigationExtras);
            $('#loginOk').modal('hide');
          }, 1000)
          

         
        },
        error => {
          this.showDiv=true;
        }
        );

    }
  }
}