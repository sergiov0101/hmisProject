import {NgModule}  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from '../user/user.component';
import {LoginComponent} from '../login/login.component';
import {RegistrationComponent} from '../registration/registration.component';
import {DetailTableComponent} from '../detail-table/detail-table.component';
import {BikedetailComponent} from '../bikedetail/bikedetail.component';
import {AdminViewComponent} from '../admin-view/admin-view.component';
import { InsertBikeComponent } from '../insert-bike/insert-bike.component';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'table', component: DetailTableComponent },
  { path: 'bikedetail', component: BikedetailComponent },
  { path : 'adminView', component : AdminViewComponent },
  { path : 'insertBike', component : InsertBikeComponent },
  { path : '', component : LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }