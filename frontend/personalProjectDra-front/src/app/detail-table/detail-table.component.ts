
    import { Component, OnInit, Inject } from '@angular/core';
    import { DataSource } from '@angular/cdk/collections';
    import { Observable } from 'rxjs';
    import { animate, state, style, transition, trigger } from '@angular/animations';
    import {Router, NavigationExtras, ActivatedRoute} from "@angular/router";
    import {DetailTableService, User} from './detail-table.service';
    import {AppComponent} from '../app.component';

    @Component({
      selector: 'app-detail-table',
      templateUrl: './detail-table.component.html',
      styleUrls: ['./detail-table.component.css'],
      animations: [
        trigger('detailExpand', [
          state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
          state('expanded', style({ height: '*', visibility: 'visible' })),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ]
    })
    
export class DetailTableComponent implements OnInit {
  public id;
  public userType;
  public navigationExtras: NavigationExtras;
  dataSource = new UserDataSource(this.service);
  public userName = "";

  displayedColumns = ['ID', 'Name', 'Surname', 'Email', 'Actions'];
  constructor(private service: DetailTableService, 
              private router: Router, 
              private route : ActivatedRoute,
              private app : AppComponent) {
    this.route.queryParams.subscribe(params => {
      this.navigationExtras = params;
      this.userType = params["UserType"];
      this.userName = params["UserName"];
      
    });
  }
  
  ngOnInit() {
    this.app.SetShowNavLogin(false);
    this.app.showUsername(this.userName,"admin");
    this.app.showNavDrop = true;
  }

  bikeDetail(id : number) : void {
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "Name": this.navigationExtras["Name"] == undefined ? '' : this.navigationExtras["Name"],
          "Email": this.navigationExtras["Email"] == undefined ? '' : this.navigationExtras["Email"],
          "Surname" : this.navigationExtras["Surname"] == undefined ? '' : this.navigationExtras["Surname"],
          "UserType": this.navigationExtras["UserType"] == undefined ? '' : this.navigationExtras["UserType"] ,
          "Id" : this.navigationExtras["Id"] == undefined ? '' : this.navigationExtras["Id"]
      }
    };

    setTimeout(() => {
      this.router.navigate(["bikedetail"], navigationExtras);
    }, 500)
  }

  deleteBike(id : number) : void {
    this.service.deleteBike(id);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  editBike(user : User) : void {
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "Bike": JSON.stringify(user)
      }
    };

    this.router.navigate(["insertBike"], navigationExtras);
  }

}

export class UserDataSource extends DataSource<any> {
  constructor(private service: DetailTableService) {
    super();
  }

  connect(): Observable<User[]> {
    return this.service.getBikes();
  }

  disconnect() {}
}



