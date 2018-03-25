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
  getFeatured(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Post[]>(
      'http://localhost:3000/posts/featured',
      { headers: headers }
    );
  }

  // Get variable amount of posts...
  getPostByURL(url:string){
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
  getPostByID(id){
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
  getAllPosts(){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Post[]>(
      'http://localhost:3000/posts/all',
      { headers: headers }
    );
  }

  // Delete One Post
  deletePost(id){
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
  addPost(){
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.post(
      'http://localhost:3000/posts/add', {},
      { headers: headers }
    );
  }
  
  // ?Active Post
  postActive(id, active){
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.post(
      'http://localhost:3000/posts/active',
      { id: id, active: active },
      { headers: headers }
    );
  }
  
  // ?Active Post
  updatePostMeta(postMeta){
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.post(
      'http://localhost:3000/posts/update-meta',
      { meta: postMeta },
      { headers: headers }
    );
  }

}