import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    menuActive: boolean = false;

    loggedIn: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {

        this.authService.getLoginState().subscribe(value => {

            this.loggedIn = value;

        });

    }

    logout(): boolean {

        this.authService.logout();

        this.authService.setLoginState();

        this.router.navigate(['home']);

        return false;

    }

    mobileMenu(): void {

        this.menuActive = !this.menuActive;

    }

}
