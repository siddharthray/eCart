import { AuthService } from "./../auth.service";
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor( private Auth: AuthService) { }

  login() {
    this.Auth.login();
  }

}
