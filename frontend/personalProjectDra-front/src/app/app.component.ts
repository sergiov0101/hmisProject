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
  public welcomeUsername = ""; 
  ngOnInit() { 
  }

  public SetShowNavLogin(condition) : void {
    this.showNavLogin = condition;
  }

  public showUsername(username) : void{
    this.welcomeUsername = "bienvenido "+username;
  }


}
