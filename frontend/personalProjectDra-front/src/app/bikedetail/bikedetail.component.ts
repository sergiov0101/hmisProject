
    import { Component, OnInit } from '@angular/core';
    import {ActivatedRoute, NavigationExtras} from "@angular/router";
    import {BikeDetailService } from './bikedetail.service';
    
    @Component({
      selector: 'bikedetail',
      templateUrl: './bikedetail.component.html',
      styleUrls: ['./bikedetail.component.css']
    })
    
export class BikedetailComponent implements OnInit {
  public id : number;
  public bike;
  public isAdminView : boolean = true;
  public userType : string;
  public bikeService;
  public navigationExtras : NavigationExtras;
  constructor(private bikeServiceIn: BikeDetailService, private route: ActivatedRoute) {
    this.bikeService = bikeServiceIn;
    this.route.queryParams.subscribe(params => {
      this.navigationExtras = {
        queryParams: {
            "Name": this.navigationExtras["Name"] == undefined ? '' : this.navigationExtras["Name"],
            "Email": this.navigationExtras["Email"] == undefined ? '' : this.navigationExtras["Email"],
            "Surname" : this.navigationExtras["Surname"] == undefined ? '' : this.navigationExtras["Surname"],
            "UserType": this.navigationExtras["UserType"] == undefined ? '' : this.navigationExtras["UserType"] ,
            "Id" : this.navigationExtras["Id"] == undefined ? '' : this.navigationExtras["Id"]
        }
      };

    });

    bikeServiceIn.getBike(this.id).subscribe(data => {
      this.bike = {
        Name: data.Name != undefined ? data.Name : '',
        Surname : data.Surname != undefined ? data.Surname : 0,
        Email : data.Email != undefined ? data.Email : 0,
        Id : data.Id != undefined ? data.Id : 0
      };
    }); 
  }
  
  ngOnInit(){}

  IsAdminView() : boolean {
    return this.isAdminView;
  }

}
