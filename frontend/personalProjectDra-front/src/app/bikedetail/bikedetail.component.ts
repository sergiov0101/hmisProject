
    import { Component, OnInit } from '@angular/core';
    import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
    import {BikeDetailService } from './bikedetail.service';
    
    @Component({
      selector: 'bikedetail',
      templateUrl: './bikedetail.component.html',
      styleUrls: ['./bikedetail.component.css']
    })
    
export class BikedetailComponent implements OnInit {
  public id : number;
  public user;
  public isAdminView : boolean = true;
  public userType : string;
  public userService;
  public navigationExtras : NavigationExtras;
  constructor(private userServiceIn: BikeDetailService, private route: ActivatedRoute, private router: Router) {
    this.userService = userServiceIn;
    this.route.queryParams.subscribe(params => {
      this.navigationExtras = {
        queryParams: {
            "Name": params["Name"] == undefined ? '' : params["Name"],
            "Email": params["Email"] == undefined ? '' : params["Email"],
            "Surname" : params["Surname"] == undefined ? '' :params["Surname"],
            "UserType": params["UserType"] == undefined ? '' : params["UserType"] ,
            "Id" : params["Id"] == undefined ? '' : params["Id"]
        }
      };
      this.userType = params["UserType"];
      this.userServiceIn.getBike(params["Id"]).subscribe(data => {
        this.user = {
          Name: data.Name != undefined ? data.Name : '',
          Surname : data.Surname != undefined ? data.Surname : 0,
          Email : data.Email != undefined ? data.Email : 0,
          Id : data.Id != undefined ? data.Id : 0
        };
      }); 
    });

    
  }

  editUser(user : User) : void {
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "Bike": JSON.stringify(user),
          "UserType" : this.userType
      }
    };

    this.router.navigate(["insertBike"], navigationExtras);
  }
  
  ngOnInit(){
    
  }

  IsAdminView() : boolean {
    return this.isAdminView;
  }

}


export interface User {
  Name : string;
  Surname : string;
  Email : string;
}
