import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class MetaService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    // Get variable amount of posts...
    get(select: string = 'title home about contact') {

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.get<any>(

            'http://localhost:3000/meta/get',

            {

                headers: headers,

                params: new HttpParams().set('select', select)

            }

        );

    }

    update(meta) {

        let token = this.authService.getToken();

        let headers = new HttpHeaders({

            'Content-Type': 'application/json',

            'Authorization': token

        });

        return this.http.post(

            'http://localhost:3000/meta/update',

            { meta: meta },

            { headers: headers }

        );

    }

}