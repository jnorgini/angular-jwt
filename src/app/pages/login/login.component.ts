import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/Login';
import { Register } from '../../models/Register';
import { JwtAuth } from '../../models/JwtAuth';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();
  currentUser: User | undefined;
  currentUserVisible: boolean = false;
  touchedLogin = false;
  touchedPassword = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  register(registerDto: Register) {
    this.authService.register(registerDto).subscribe((userData: any) => {
      console.log(userData);
    });
  }

  login(loginDto: Login) {
    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwtToken', jwtDto.token);
      console.log('Token: ', jwtDto.token, '\nRefreshToken: ', jwtDto.refreshToken, '\nUsername: ', jwtDto.username);
      this.userDetails();
      this.router.navigate(['/home']);
    });
  }

  userDetails(): void {
    this.authService.getCurrentUser()
      .subscribe(user => {
        this.currentUser = user;
      });
  }

}
