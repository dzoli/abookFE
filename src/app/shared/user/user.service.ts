import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Observer } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public test: string;
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    private baseUrl: string = environment.apiUrl;

    constructor(private router: Router, private http: HttpClient) {
        this.test = 'aaa';


    }

    loginUser(userData: any):Observable<any> {
        const authUrl = this.baseUrl + 'authenticate/';
        console.log(userData);
        return this.http.post(authUrl, userData, {headers: this.httpHeaders});
    }


}
