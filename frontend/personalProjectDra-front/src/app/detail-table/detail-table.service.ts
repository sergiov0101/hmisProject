import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DetailTableService {

    private serviceUrl = 'http://proyectohmis.eastus.cloudapp.azure.com:5002';
    
    constructor(private http: HttpClient) { }
    
    getBikes(): Observable<User[]> {   
        return  this.http.get<User[]>(this.serviceUrl + "/users");
    }
    
    deleteBike(id : number) : void {
        this.http.post(this.serviceUrl + "/users/delete", {
            "Id": id
        }).subscribe(response => {
            console.log("RESPONSE : ", response);
        });
    }
}

export interface User {
    Name : string;
    Surname : string;
    Email : string;
}