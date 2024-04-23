import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSidebarOpen!: boolean;
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.authService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  userInfo(user: User) {
    this.selectedUser = user;
    console.log(user);
  }

  open() {
    this.isSidebarOpen = true;
  }

  close() {
    this.isSidebarOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Disconnected. Token has been removed.');
  }

}
