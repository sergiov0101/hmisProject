import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { InsertBikeService, User } from '../insert-bike/insert-bike.service';

@Component({
  selector: 'app-insert-bike',
  templateUrl: './insert-bike.component.html',
  styleUrls: ['./insert-bike.component.css']
})
export class InsertBikeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private insertService : InsertBikeService) {
    this.route.queryParams.subscribe(params => {
      if (params["Bike"] != undefined) {
        this.user = JSON.parse(params["Bike"]);
        this.shouldShowEditButton = true;
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

    this.router.navigate(["adminView"], navigationExtras);
  }

  editBike() {
    this.insertService.editBike(this.user);

    let navigationExtras: NavigationExtras = {
      queryParams: {
          "UserType": "admin",
          "mustReload" : true
      }
    };

    this.router.navigate(["adminView"], navigationExtras);
  }

}
