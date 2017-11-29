import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostalService {

  constructor(
    private http: Http
  ){}

  // Get variable amount of posts...
  getFeatured(){
    let headers = new Headers();
    return this.http.get(
      'http://localhost:3000/posts/featured',
      { headers: headers }
    ).map( res => res.json() );
  }

  // Get variable amount of posts...
  getPostByURL(url){
    let headers = new Headers();
    return this.http.get(
      'http://localhost:3000/posts/post',
      {
        headers: headers,
        search: { url: url }
      }
    ).map( res => res.json() );
  }

  // Get all posts
  getAllPosts(){
    let headers = new Headers();
    return this.http.get(
      'http://localhost:3000/posts/all',
      { headers: headers }
    ).map( res => res.json() );
  }

}