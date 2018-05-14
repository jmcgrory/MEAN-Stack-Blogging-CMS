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

    ) { }

    // Media Upload
    upload(fileToUpload: File) {

        console.log(fileToUpload);

        let formData: FormData = new FormData();

        formData.append('file', fileToUpload, fileToUpload.name);

        let token = this.authService.getToken();

        let headers = new HttpHeaders({

            'Authorization': token

        });

        return this.http.post(

            'http://localhost:3000/media/upload',

            formData,

            {
                headers: headers,

                params: new HttpParams()

            }

        );

    }

    getAllMedia() {

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
    delete(path: string) {

        let token = this.authService.getToken();

        let headers = new HttpHeaders({

            'Content-Type': 'application/json',

            'Authorization': token

        });

        return this.http.post<string>(

            'http://localhost:3000/media/delete',

            { filePath: path },

            {

                headers: headers,

                params: new HttpParams()

            }

        );

    }

}