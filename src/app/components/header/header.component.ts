import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) { }

  logout() {
    try {
      localStorage.removeItem('jwtToken');
      this.router.navigate(['/login']);
      console.log('Token removed successfully.');
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }

}
