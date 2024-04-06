import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isModalOpen = false;
  isExpanded: boolean = false;
  searchQuery: string = '';

  constructor(private authService: AuthenticationService, private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Disconnected. Token has been removed.')
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  expandInput() {
    this.isExpanded = true;
  }

  contractInput() {
    if (!this.searchQuery.trim()) {
      this.isExpanded = false;
    }
  }

  checkInput() {
    this.isExpanded = true;
  }

}
