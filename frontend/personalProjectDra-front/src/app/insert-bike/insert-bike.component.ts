import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { InsertBikeService, User } from '../insert-bike/insert-bike.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-insert-bike',
  templateUrl: './insert-bike.component.html',
  styleUrls: ['./insert-bike.component.css']
})
export class InsertBikeComponent implements OnInit {

  public isAdminUser = false;
  public userType = "admin";
  constructor(private router: Router, private route: ActivatedRoute, private insertService : InsertBikeService, private _location: Location) {
    this.route.queryParams.subscribe(params => {
      if (params["Bike"] != undefined) {
        this.user = JSON.parse(params["Bike"]);
        this.shouldShowEditButton = true;
        this.isAdminUser = params["UserType"] !== "user";
        this.userType = params["UserType"];
      }      
    });
  }

  public shouldShowEditButton = false;
  public user : User;
  ngOnInit() {}

  addBike() {
    this.insertService.addBike(this.user);

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "UserType": "admin",
          "mustReload" : true
      }
    };

    if (this.isAdminUser) {
      this.router.navigate(["adminView"], navigationExtras);
    }else{
      this.back();
    }
  }

  back() {
    this._location.back();
  }

  editBike() {
    console.log("THIS USER : ", this.user);
    this.insertService.editBike(this.user);

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "UserType": "admin",
          "mustReload" : true
      }
    };

    if (this.isAdminUser) {
      this.router.navigate(["adminView"], navigationExtras);
    }else{
      this.back();
    }
    
  }

}
