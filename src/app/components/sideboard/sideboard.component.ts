import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sideboard',
  templateUrl: './sideboard.component.html',
  styleUrls: ['./sideboard.component.css']
})
export class SideboardComponent {
  isSubMenuHidden: boolean = true;
  isArrowUp: boolean = false;
  isSidebarOpen: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  open() {
    this.isSidebarOpen = true;
  }

  close() {
    this.isSidebarOpen = false;
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
