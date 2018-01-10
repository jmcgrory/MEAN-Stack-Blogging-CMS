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
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      'http://localhost:3000/posts/featured',
      { headers: headers }
    ).map( res => res.json() );
  }

  // Get variable amount of posts...
  getPostByURL(url){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      'http://localhost:3000/posts/post',
      {
        headers: headers,
        search: { url: url }
      }
    ).map( res => res.json() );
  }
  
  // Get variable amount of posts...
  getPostByID(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      'http://localhost:3000/posts/post',
      {
        headers: headers,
        search: { id: id }
      }
    ).map( res => res.json() );
  }

  // Get all posts
  getAllPosts(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(
      'http://localhost:3000/posts/all',
      { headers: headers }
    ).map( res => res.json() );
  }

  // Delete One Post
  deletePost(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/posts/delete',
      { _id: id },
      { headers: headers }
    ).map( res => res.json() );
  }
  
  // Add Generic Post
  addPost(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/posts/add', {},
      { headers: headers }
    ).map( res => res.json() );
  }
  
  // ?Active Post
  postActive(id, active){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/posts/active',
      { id: id, active: active },
      { headers: headers }
    ).map( res => res.json() );
  }
  
  // ?Active Post
  updatePostMeta(postMeta){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/posts/update-meta',
      { meta: postMeta },
      { headers: headers }
    ).map( res => res.json() );
  }

}