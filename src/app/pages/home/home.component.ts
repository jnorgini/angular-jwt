import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
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

}
