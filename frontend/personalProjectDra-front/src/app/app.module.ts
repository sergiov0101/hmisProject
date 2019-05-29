import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from './core/material.module';
import { AppRoutingModule } from './core/app.routing.module';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './registration/registration.component';
import { AgmCoreModule } from '@agm/core';
import { DetailTableComponent } from './detail-table/detail-table.component';
import { DetailTableService } from './detail-table/detail-table.service';
import { BikeDetailService } from './bikedetail/bikedetail.service';
import { LoginService } from './login/login.service';
import { RegistrationService } from './registration/registration.service';
import { MatToolbarModule,  MatTableModule } from '@angular/material';
import { MainBikesViewComponent } from './main-bikes-view/main-bikes-view.component';
import { BikedetailComponent } from './bikedetail/bikedetail.component';
import { HttpClientModule} from '@angular/common/http';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { InsertBikeComponent } from './insert-bike/insert-bike.component';
import { InsertBikeService } from './insert-bike/insert-bike.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const googleMapsCore = AgmCoreModule.forRoot({
  apiKey : 'AIzaSyBFLaCLVCUNXEW_lvDjFZzPEeHNxbGEnxg',
});

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegistrationComponent,
    DetailTableComponent,
    MainBikesViewComponent,
    BikedetailComponent,
    AdminViewComponent,
    InsertBikeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    googleMapsCore,
    MatToolbarModule,
    MatTableModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    DetailTableService, 
    BikeDetailService, 
    LoginService, 
    RegistrationService,
    InsertBikeService

  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
