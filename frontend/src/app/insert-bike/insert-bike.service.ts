import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class InsertBikeService {

    private serviceUrl = 'http://localhost:5002';
    
    constructor(private http: HttpClient) { }
        
    addBike(bike : Bike) : void {
        this.http.post(this.serviceUrl + "/bikes/add", bike).subscribe(response => {
            console.log("RESPONSE : ", response);
        });
    }
    
    editBike(bike : Bike) : void {
        console.log("BIKE : ", bike)
        this.http.post(this.serviceUrl + "/bikes", bike).subscribe(response => {
            console.log("RESPONSE : ", response);
        });
    }

}

export interface Bike {
    Model : string;
    Lat: number;
    Lon: any;
    Address: string;
    Booked: boolean;
    Id: number;
}
