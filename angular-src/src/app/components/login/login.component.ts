import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Response } from '../../models/response.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    name: String;

    password: String;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onLoginSubmit(): void {

        const user = {

            name: this.name,

            password: this.password

        }

        this.authService.authenticateUser(user).subscribe((data: Response) => {

            if (data.success) {

                this.authService.storeUserData(data.token, data.user.name);

                this.authService.setLoginState();

                this.router.navigate(['dashboard']);

            } else {

                this.router.navigate(['login']);

            }

        });

    }

}
