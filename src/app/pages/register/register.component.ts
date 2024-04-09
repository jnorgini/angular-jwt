import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { catchError } from 'rxjs';
import { User } from '../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerDto = new User();
  validation = false;
  passwordVisible = false;
  confirmPasswordVisible = false;
  firstNameFocused = false;
  lastNameFocused = false;
  usernameFocused = false;
  emailFocused = false;
  passwordFocused = false;
  confirmPasswordFocused = false;

  constructor(private authService: AuthenticationService) { }

  validateFields(): boolean {
    const { firstName, lastName, username, email, password, confirmPassword } = this.registerDto;

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      console.log('Por favor, preencha todos os campos.');
      return false;
    }

    if (password.length < 8 || password.length > 16 || /\s/.test(password)) {
      console.log('A senha deve ter entre 8 e 16 caracteres e não pode haver espaços.');
      return false;
    }

    if (password !== confirmPassword) {
      console.log('As senhas não coincidem. Por favor, confirme a senha corretamente.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Por favor, insira um endereço de email válido.');
      return false;
    }
    return true;
  }

  register(registerDto: User) {
    this.validation = true;
    if (!this.validateFields()) {
      return;
    }
    this.authService.register(registerDto).pipe(
      catchError((error) => {
        console.log('Failed to create user.');
        throw error;
      })
    ).subscribe(() => {
      console.log('User created successfully!');
      this.registerDto = new User();
      this.validation = false;
    });
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility(confirmPasswordInput: HTMLInputElement): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    confirmPasswordInput.type = this.confirmPasswordVisible ? 'text' : 'password';
  }

  hasText(inputValue: string): boolean {
    return !!inputValue;
  }

}
