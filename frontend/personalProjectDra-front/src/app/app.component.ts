import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'personalProjectDra-front';
  lat: number = 51.678418;
  lng: number = 7.809007;
  showNavLogin = false;
  showNavDrop = false;
  public activeNavRegister = false;
  public activeNavLogin = false;
  public welcomeUsername = ""; 
  ngOnInit() { 
  }
  
  public resetActivenavs(): void{
    this.activeNavRegister = false;
    this.activeNavLogin = false;
  }

  public SetShowNavLogin(condition) : void {
    this.showNavLogin = condition;
  }
  public setShowNavDrop(condition): void{
      this.showNavDrop = condition;
  }

  public showUsername(username,label = 'none') : void{
    this.welcomeUsername = "<h6>bienvenido "+username;
    if(label == 'admin'){
      this.welcomeUsername = this.welcomeUsername+'<span class="badge badge-pill badge-success">Admin</span></h6>';
    }

    this.welcomeUsername = this.welcomeUsername+"</h6>";
  }


}
