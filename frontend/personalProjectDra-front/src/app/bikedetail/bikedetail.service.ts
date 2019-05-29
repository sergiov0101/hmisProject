
import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders  }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BikeDetailService {

    private serviceUrl = 'http://proyectohmis.eastus.cloudapp.azure.com:5002';
    
    constructor(private http: HttpClient) { }
    
    getBike(id: number): Observable<User> {
        return this.http.get<User>(this.serviceUrl + "/users/" + id);
    }
}

export interface User {
   Id: number;
   Name : string;
   Surname : string;
   Email : string;
}