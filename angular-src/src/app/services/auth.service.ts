import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  
  token: any;
  user: any;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
    const helper = new JwtHelperService();
  }

  registerUser(user){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(
      'http://localhost:3000/users/register',
      user,
      {headers: headers}
    );
  }
  
  authenticateUser(user){
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let response = this.http.post(
      'http://localhost:3000/users/authenticate',
      user,
      { headers: headers }
    );
    return response;
  }
  
  storeUserData(token, user){
    localStorage.setItem('id_token', 'jwt '+token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = 'jwt '+token;
    this.user = user;
  }

  loadToken(){
    this.token = this.getToken();
  }

  getToken(){
    var local_token = localStorage.getItem('id_token');
    return (local_token) ? local_token : 'jwt false';
  }

  loggedIn(){
    var token = this.jwtHelper.decodeToken(this.token);
    return (token) ? token : false;
  }

  logout(){
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

}
