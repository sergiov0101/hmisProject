
import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders  }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BikeDetailService {

    private serviceUrl = 'http://localhost:5002';
    
    constructor(private http: HttpClient) { }
    
    getBike(id: number): Observable<Bike> {
        let o =   this.http.get<Bike>(this.serviceUrl + "/bike/1");
        return o;
    }

    bookBike(idBike: number, idUser : number): Observable<any> {
        let o = this.http.post(this.serviceUrl + "/bikes/book", {IdBike: 1, IdUser : 1});
        console.log("O ", o)
        return o;
    }

    deleteBike(idBike: number): Observable<any> {
        let o = this.http.post(this.serviceUrl + "/bikes/delete", {IdBike: 1});
        return o;
    }
}

export interface Bike {
    Model : string;
    Lat: number;
    Lon: number;
    Address: number;
    Booked: boolean;
    Id: number;
}