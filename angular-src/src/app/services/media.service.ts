import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Media } from 'app/models/media.model';
import { AuthService } from './auth.service';

@Injectable()
export class MediaService {

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ){}

    // Media Upload
    upload(media){

        // TODO: Sort this out
        console.log(media);

        // let headers = new HttpHeaders({'Content-Type': 'application/json'});
        // return this.http.get<Media[]>(
        //     'http://localhost:3000/media/upload',
        //     { 
        //         headers: headers,
        //         params: new HttpParams().set('limit', limit)
        //     }
        // );

    }

    getAllMedia(){

        // TODO: Pagination...

        let token = this.authService.getToken();
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token
        });
        return this.http.get<Media[]>(
            'http://localhost:3000/media/all',
            { 
                headers: headers,
                params: new HttpParams()
            }
        );

    }

    // Delete Media
    delete(id){

        // TODO: Make this
        console.log(id);

    }

}