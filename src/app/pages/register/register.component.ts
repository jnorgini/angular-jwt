import { Component, OnInit, inject } from '@angular/core';
import { Register } from '../../models/Register';
import { JwtAuth } from '../../models/JwtAuth';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerDto = new Register();
  jwtDto = new JwtAuth();
  touchedFirstname = false;
  touchedLastname = false;
  touchedEmail = false;
  touchedUsername = false;
  touchedPassowrd = false;
  touchedConfirmPassword = false;
  touchedRole = false;
  touchedStatus = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  register(registerDto: Register) {
    this.authService.register(registerDto).subscribe((userData: any) => {
      console.log(userData);
    });
  }

}
