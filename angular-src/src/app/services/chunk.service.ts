import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Chunk } from 'app/models/chunk.model';

@Injectable()
export class ChunkService {

  constructor(
    private http: HttpClient
  ){}

  getAllChunks(array){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get<Chunk[]>(
      'http://localhost:3000/chunks/all',
      {
        headers: headers,
        //search: [array]
        params: new HttpParams().set('_id', array)
      }
    )//.map( res => res.json() );
  }

  deleteChunk(id){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/chunks/delete',
      { id: id },
      { headers: headers }
    )//.map( res => res.json() );
  }

  createChunk(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/chunks/add',
      {},
      { headers: headers }
    )//.map( res => res.json() );
  }

  updateChunk(chunk){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/chunks/update',
      {
        id: chunk._id,
        type: chunk.type,
        content: chunk.content
      },
      { headers: headers }
    )//.map( res => res.json() );
  }

}