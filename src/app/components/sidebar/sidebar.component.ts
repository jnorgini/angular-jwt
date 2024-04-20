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
  isSubMenuHidden = true;
  isArrowUp = false;
  isSidebarOpen!: boolean;
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    const storedSidebarState = localStorage.getItem('sidebarState');
    this.isSidebarOpen = storedSidebarState ? JSON.parse(storedSidebarState) : false;
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
    localStorage.setItem('sidebarState', JSON.stringify(this.isSidebarOpen));
  }

  close() {
    this.isSidebarOpen = false;
    localStorage.setItem('sidebarState', JSON.stringify(this.isSidebarOpen));
  }

  dropdown() {
    this.isSubMenuHidden = !this.isSubMenuHidden;
    this.isArrowUp = !this.isArrowUp;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Disconnected. Token has been removed.');
  }

}
