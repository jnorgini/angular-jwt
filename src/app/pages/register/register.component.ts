import { Component } from '@angular/core';
import { Register } from '../../models/Register';
import { JwtAuth } from '../../models/JwtAuth';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerDto = new Register();
  jwtDto = new JwtAuth();
  validation = false;

  constructor(private authService: AuthenticationService) { }

  register(registerDto: Register) {
    this.validation = true;
    if (!registerDto.firstName || !registerDto.lastName || !registerDto.username || !registerDto.email || !registerDto.password || !registerDto.confirmPassword || !registerDto.role || !registerDto.status) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    this.authService.register(registerDto).subscribe((userData: any) => {
      console.log(userData);
      this.registerDto = new Register();
      this.validation = false;
    });
  }

}
