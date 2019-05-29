import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders  }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService {
    private serviceUrl = 'http://localhost:5002';
    
    constructor(private http: HttpClient) { }
    
    login(userLogin : SignIn): Observable<SignIn> {
        let o =  this.http.post<SignIn>(this.serviceUrl + "/signin", userLogin);
        return o;
    }
}

export interface SignIn {
   UserName : string,
   Password : string,
   Name : string,
   Surname : string,
   Email : string
}
