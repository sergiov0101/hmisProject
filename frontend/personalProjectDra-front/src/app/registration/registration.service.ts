import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders  }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService {
    private serviceUrl = 'http://proyectohmis.eastus.cloudapp.azure.com:5002';
    
    constructor(private http: HttpClient) { }
    
    createUser(userLogin : SignIn): Observable<SignIn> {
        let o =  this.http.post<SignIn>(this.serviceUrl + "/users/add", userLogin);
        return o;
    }
}

export interface SignIn {
   Username : string,
   Password : string,
   Name : string,
   Surname : string,
   Email : string
}
