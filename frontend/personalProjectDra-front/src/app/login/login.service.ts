
import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders  }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    private serviceUrl ='http://proyectohmis.eastus.cloudapp.azure.com:5002';
    
    constructor(private http: HttpClient) { }
    
    login(userLogin : Login): Observable<Login> {
        console.log(userLogin);
        let o =  this.http.post<Login>(this.serviceUrl + "/login", userLogin);
        return o;
    }
}

export interface Login {
   Username : string,
   Password : string
}
