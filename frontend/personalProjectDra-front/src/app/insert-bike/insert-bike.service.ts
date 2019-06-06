import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class InsertBikeService {

    private serviceUrl = 'http://proyectohmis.eastus.cloudapp.azure.com:5002';
    
    constructor(private http: HttpClient) { }
        
    addBike(user : User) : void {
        this.http.post(this.serviceUrl + "/users/add", user).subscribe(response => {
            console.log("RESPONSE : ", response);
        });
    }
    
    editBike(user : User) : void {
        this.http.post(this.serviceUrl + "/users", user).subscribe(response => {
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
