import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  currentUser: User | null = null;
  currentUserVisible: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails();
  }

  toggleUserDetails(): void {
    this.currentUserVisible = !this.currentUserVisible;
  }

  userDetails(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    try {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      console.log('Logout successful.');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

}
