import { Injectable }   from '@angular/core';
import { HttpClient, HttpHeaders  }   from '@angular/common/http';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RegistrationService {
    private serviceUrl = 'http://proyectohmis.eastus.cloudapp.azure.com:5002/users/add';
    
    constructor(private http: HttpClient) { }
    
    createUser(userLogin : SignIn): Observable<SignIn> {
        console.log("USERLOGIN : ", userLogin)
        let o =  this.http.post<SignIn>(this.serviceUrl, {
            "Username" : userLogin.Username,
            "Password" : userLogin.Password,
            "Name" : userLogin.Name,
            "Surname" : userLogin.Surname,
            "Email" : userLogin.Email
            });
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
