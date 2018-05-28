import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    date: Date = new Date();

    d = this.date.getFullYear();

    loggedIn: boolean;

    constructor(
        private authService: AuthService,
    ) {

        this.authService.getLoginState().subscribe(value => {

            this.loggedIn = value;

        });

    }

}