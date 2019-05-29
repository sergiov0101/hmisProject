
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
            "Id" : this.navigationExtras["Id"] == undefined ? '' : this.navigationExtras["Id"],
            "IdBike" : this.navigationExtras["IdBike"] == undefined ? '' : this.navigationExtras["IdBike"]
        }
      };

      if (params["UserType"] == "admin") {
        this.isAdminView = false;
      } else {
        this.isAdminView = true;
      }

    });

    bikeServiceIn.getBike(this.id).subscribe(data => {
      this.bike = {
        Model: data.Model != undefined ? data.Model : '',
        Lat : data.Lat != undefined ? data.Lat : 0,
        Lon : data.Lon != undefined ? data.Lon : 0,
        Id : data.Id != undefined ? data.Id : 0
      };
    }); 
  }
  
  ngOnInit(){}

  IsAdminView() : boolean {
    return this.isAdminView;
  }

  bookBike(id : number){
    this.bikeService.bookBike(1, 1).subscribe(data => {
      // TODO: IMPLEMENTAR
    })
  }

  deleteBike(id : number){
    this.bikeService.deleteBike(1).subscribe(data => {
      // TODO: IMPLEMENTAR
    })
  }
}
