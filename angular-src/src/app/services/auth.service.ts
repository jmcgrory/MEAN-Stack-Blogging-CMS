import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

    token: any;

    user: any;

    loginState = new Subject<any>();

    constructor(

        private http: HttpClient,

        private router: Router,

        public jwtHelper: JwtHelperService

    ) {

        const helper = new JwtHelperService();

    }

    setLoginState(): void {

        const token = this.loggedIn() ? true : false;

        this.loginState.next(token);

    }

    getLoginState(): Observable<any> {

        return this.loginState.asObservable();

    }

    loggedIn() {

        var token = this.jwtHelper.decodeToken(this.token);

        return (token) ? token : false;

    }

    registerUser(user) {

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(

            `${environment.apiUrl}/users/register`,

            user,

            { headers: headers }

        );

    }

    authenticateUser(user) {

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(

            `${environment.apiUrl}/users/authenticate`,

            user,

            { headers: headers }

        );

    }

    getTokenExpirationDate(token: string): Date {

        const decoded = this.jwtHelper.decodeToken(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0);

        date.setUTCSeconds(decoded.exp);

        return date;

    }

    isTokenExpired(token?: string): boolean {

        if (!token) token = this.getToken();

        if (!token) return true;

        const date = this.getTokenExpirationDate(token);

        if (date === undefined) return false;

        return !(date.valueOf() > new Date().valueOf());

    }

    storeUserData(token: string, user): void {

        localStorage.setItem('id_token', 'jwt ' + token);

        localStorage.setItem('user', JSON.stringify(user));

        this.token = 'jwt ' + token;

        this.user = user;

    }

    loadToken(): void {

        this.token = this.getToken();

    }

    getToken(): string {

        var local_token = localStorage.getItem('id_token');

        if (this.isTokenExpired(local_token)) this.logout();

        return (local_token) ? local_token : 'jwt false';

    }

    logout(): void {

        this.token = null;

        this.user = null;

        localStorage.clear();

        this.router.navigate(['login']);

    }

}
