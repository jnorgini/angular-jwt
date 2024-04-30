import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { UserDialogComponent } from '../../dialogs/user-dialog/user-dialog.component';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';

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
      const dialogRef = this.dialog.open(UserDialogComponent, {
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

  deleteUser(id: number) {
    this.authService.delete(id).pipe(
      catchError((error) => {
        throw error;
      })
    ).subscribe(() => {
      console.log('User successfully removed!');
      this.users = this.users.filter(user => user.id !== id);
    });
  }

  openConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      data: 'The user will be removed permanently.'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.deleteUser(id);
      }
    });
  }

  userDetails(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
      this.isAdmin = user?.role === 'ADMIN';
    });
  }

  filterUsers(searchQuery: string): void {
    if (!searchQuery.trim()) {
      this.getUsers();
    } else {
      this.users = this.users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }

}
