import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GitService {

    constructor(

        private http: HttpClient

    ){}

    // Get variable amount of posts...
    getUser() {

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.get<any>(

            'https://api.github.com/users/jmcgrory/events',

            { headers: headers }
            
        );

    }

}