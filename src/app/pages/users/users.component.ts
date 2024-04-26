import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  currentUser: User | null = null;
  isAdmin: boolean = false;

  constructor(private authService: AuthenticationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
    this.userDetails();
  }

  getUsers() {
    this.authService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  openEditUserModal(userId: number) {
    const user = this.users.find(user => user.id === userId);
    if (user) {
      const dialogRef = this.dialog.open(EditUserComponent, {
        width: '500px',
        closeOnNavigation: true,
        data: Object.assign({}, user)
      });

      dialogRef.componentInstance.userUpdated.subscribe((updatedUser: User) => {
        const index = this.users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      });
    } else {
      console.error('User not found');
    }
  }

  userDetails(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.isAdmin = user?.role === 'ADMIN';
    });
  }

}
