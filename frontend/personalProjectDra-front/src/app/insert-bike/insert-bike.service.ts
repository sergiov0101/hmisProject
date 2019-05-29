import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class InsertBikeService {

    private serviceUrl = 'http://proyectohmis.eastus.cloudapp.azure.com:5002';
    
    constructor(private http: HttpClient) { }
        
    addBike(bike : User) : void {
        this.http.post(this.serviceUrl + "/users/add", bike).subscribe(response => {
            console.log("RESPONSE : ", response);
        });
    }
    
    editBike(bike : User) : void {
        this.http.post(this.serviceUrl + "/users", bike).subscribe(response => {
            console.log("RESPONSE : ", response);
        });
    }

}

export interface User {
    Name : string;
    Surname : string;
    Id : number;
    Email : string;
}
