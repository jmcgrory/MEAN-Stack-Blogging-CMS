import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Post } from 'app/models/post.model';

@Injectable()
export class PostalService {

  constructor(
    private http: HttpClient
  ){}

  // Get variable amount of posts...
  getFeatured(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<Post[]>(
      'http://localhost:3000/posts/featured',
      { headers: headers }
    );
  }

  // Get variable amount of posts...
  getPostByURL(url:string){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<Post>(
      'http://localhost:3000/posts/post',
      {
        headers: headers,
      //  search: { url: url }
        params: new HttpParams().set('url', url)
      }
    );
  }
  
  // Get variable amount of posts...
  getPostByID(id){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<Post>(
      'http://localhost:3000/posts/post',
      {
        headers: headers,
        //search: { id: id }
        params: new HttpParams().set('id', id)
      }
    );
  }

  // Get all posts
  getAllPosts(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<Post[]>(
      'http://localhost:3000/posts/all',
      { headers: headers }
    );
  }

  // Delete One Post
  deletePost(id){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/posts/delete',
      { _id: id },
      { headers: headers }
    );
  }
  
  // Add Generic Post
  addPost(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/posts/add', {},
      { headers: headers }
    );
  }
  
  // ?Active Post
  postActive(id, active){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/posts/active',
      { id: id, active: active },
      { headers: headers }
    );
  }
  
  // ?Active Post
  updatePostMeta(postMeta){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/posts/update-meta',
      { meta: postMeta },
      { headers: headers }
    );
  }

}