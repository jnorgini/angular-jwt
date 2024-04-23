import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.authService.getUsers().subscribe( data => {
      this.users = data;
    });
  }

}
