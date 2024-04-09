import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/authentication.service';
import { catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  user = new User();
  validation = false;
  passwordVisible = false;
  confirmPasswordVisible = false;
  firstNameFocused = false;
  lastNameFocused = false;
  usernameFocused = false;
  emailFocused = false;
  passwordFocused = false;
  confirmPasswordFocused = false;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.authService.getUserById(userId).subscribe(user => {
        this.user = user;
      });
    });
  }

  updateUser() {
    this.validation = true;
    if (!this.validateFields()) {
      return;
    }
    this.authService.update(this.user).pipe(
      catchError((error) => {
        console.log('Failed to update user.');
        throw error;
      })
    ).subscribe(() => {
      console.log('User updated successfully!');
      this.user = new User();
      this.validation = false;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    window.location.reload();
    console.log('Disconnected. Token has been removed.');
  }

  validateFields(): boolean {
    const { firstName, lastName, username, email, password, confirmPassword } = this.user;

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

