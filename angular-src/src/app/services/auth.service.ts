import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  
  authToken: any;
  user: any;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
    const helper = new JwtHelperService();
  }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:3000/users/register',
      user,
      {headers: headers}
    );
  }
  
  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    let response = this.http.post(
      'http://localhost:3000/users/authenticate',
      user,
      { headers: headers }
    );
    return response;
  }
  
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    this.authToken = this.getToken();
  }

  getToken(){
    return localStorage.getItem('id_token');
  }

  loggedIn(){
    console.log(this.authToken);
    var blah = this.jwtHelper.decodeToken(this.authToken);
    return blah;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
