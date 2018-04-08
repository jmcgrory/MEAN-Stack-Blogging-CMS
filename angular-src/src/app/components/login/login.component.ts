import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Response } from '../../models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Init Vars
  name: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      name: this.name,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe((data:Response)=>{
      console.log(data);
      if(data.success){
        this.authService.storeUserData(data.token, data.user.name);
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['login']);
      }

    });

  }

}
