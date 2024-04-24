import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  @Output() searchQueryChange = new EventEmitter<string>();

  isModalOpen = false;
  isExpanded: boolean = false;
  searchQuery: string = '';
  currentUser: User | null = null;
  currentUserVisible: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.userDetails();
  }

  onSearchQueryChange(): void {
    this.searchQueryChange.emit(this.searchQuery);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Disconnected. Token has been removed.');
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

  toggleUserDetails(): void {
    this.currentUserVisible = !this.currentUserVisible;
  }

  userDetails(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.isAdmin = user?.role === 'ADMIN';
    });
  }

}
