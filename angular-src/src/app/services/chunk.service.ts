import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Chunk } from 'app/models/chunk.model';
import { AuthService } from './auth.service';

@Injectable()
export class ChunkService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ){}

  getAllChunks(array){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Chunk[]>(
      'http://localhost:3000/chunks/all',
      {
        headers: headers,
        params: new HttpParams().set('_id', array)
      }
    )
  }

  deleteChunk(id){
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.post(
      'http://localhost:3000/chunks/delete',
      { id: id },
      { headers: headers }
    )
  }

  createChunk(){
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.post(
      'http://localhost:3000/chunks/add',
      {},
      { headers: headers }
    )
  }

  updateChunk(chunk){
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    return this.http.post(
      'http://localhost:3000/chunks/update',
      {
        id: chunk._id,
        type: chunk.type,
        content: chunk.content
      },
      { headers: headers }
    )
  }

}