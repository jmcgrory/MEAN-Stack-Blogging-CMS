import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

    this.authService.authenticateUser(user).subscribe(data=>{

      if(data.success){
        console.log('Login Successful');
        this.authService.storeUserData(data.token, data.name);
        this.router.navigate(['dashboard']);
      } else {
        console.log(data);
        this.router.navigate(['login']);
      }

    });
  }

}
