import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Post } from 'app/models/post.model';
import { AuthService } from './auth.service';

@Injectable()
export class PostalService {

    constructor(

        private http: HttpClient,

        private authService: AuthService
        
    ){}

    // Get variable amount of posts...
    getLimitPosts(limit: number){

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        const limitInteger = !isNaN(limit) ? limit+"" : "0";

        return this.http.get<Post[]>(

            'http://localhost:3000/posts/limit',
            
            {

                headers: headers,

                params: new HttpParams().set('limit', limitInteger)

            }

        );

    }

    // Get variable amount of posts...
    getPostByURL(url: string) {

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.get<Post>(

            'http://localhost:3000/posts/post',

            {

                headers: headers,

                params: new HttpParams().set('url', url)

            }

        );

    }

    // Get variable amount of posts...
    getPostByID(id: string) {

        let headers = new HttpHeaders({'Content-Type': 'application/json'});

        return this.http.get<Post>(

            'http://localhost:3000/posts/post',

            {

                headers: headers,

                params: new HttpParams().set('id', id)

            }

        );

    }

    // Get all posts
    getAllPosts() {

        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        
        return this.http.get<Post[]>(

            'http://localhost:3000/posts/all',

            { headers: headers }

        );

    }

    // Get Posts with args
    getPosts(params: object) {

        /*

            // Params

            limit: string,
            offset: string,
            order: string,
            active: string,
            fields: string[],
            categories: string[],
            excluding: string[]

        */

        let httpParams = new HttpParams();

        Object.keys(params).map(key => {

            let value = params[key];

            if(Array.isArray(value)) value = value.join(',');

            httpParams = httpParams.set(key, value);

        });

        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        
        return this.http.get<any[]>(

            'http://localhost:3000/posts/get',

            {

                headers: headers,

                params: httpParams

            }

        );

    }

    // Delete One Post
    deletePost(id: string) {

        let token = this.authService.getToken();

        let headers = new HttpHeaders({

            'Content-Type': 'application/json',

            'Authorization': token

        });

        return this.http.post(

            'http://localhost:3000/posts/delete',

            { _id: id },

            { headers: headers }

        );

    }

    // Add Generic Post
    addPost() {

        let token = this.authService.getToken();

        let headers = new HttpHeaders({

            'Content-Type': 'application/json',

            'Authorization': token

        });

        return this.http.post(

            'http://localhost:3000/posts/add',

            {},

            { headers: headers }

        );

    }

    // ?Active Post
    postActive(id: string, active: boolean) {

        let token = this.authService.getToken();

        let headers = new HttpHeaders({

            'Content-Type': 'application/json',

            'Authorization': token

        });

        return this.http.post(

            'http://localhost:3000/posts/active',

            {

                id: id,

                active: active

            },

            { headers: headers }

        );

    }

    // ?Active Post
    updatePost(post: Post) {

        let token = this.authService.getToken();

        let headers = new HttpHeaders({

            'Content-Type': 'application/json',

            'Authorization': token

        });

        return this.http.post(

            'http://localhost:3000/posts/update',

            { post: post },

            { headers: headers }

        );

    }

}