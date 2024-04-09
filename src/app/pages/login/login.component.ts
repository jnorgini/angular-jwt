import { Component } from '@angular/core';
import { Login } from '../../models/Login';
import { JwtAuth } from '../../models/JwtAuth';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDto = new Login();
  jwtDto = new JwtAuth();
  validation = false;
  passwordVisible = false;
  usernameFocused = false;
  passwordFocused = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  validateFields(): boolean {
    const { username, password } = this.loginDto;
    if (!username || !password) {
      console.log('Por favor, preencha todos os campos.');
      return false;
    }
    return true;
  }

  login(loginDto: Login) {
    this.validation = true;
    if (!this.validateFields()) {
      return;
    }
    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwtToken', jwtDto.token);
      this.router.navigate(['/home']);
      this.loginDto = new Login();
      this.validation = false;
    });
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }

  hasText(inputValue: string): boolean {
    return !!inputValue;
  }

}
