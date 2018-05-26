import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    menuActive: boolean = false;

    loggedIn: boolean = this.authService.loggedIn();

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    logout(): boolean {

        this.authService.logout();

        this.router.navigate(['home']);

        return false;

    }

    mobileMenu(): void {

        this.menuActive = !this.menuActive;

    }

}
