import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/authentication.service';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;
  currentUserVisible: boolean = false;
  client = new Client();
  clients: Client[] = [];

  constructor(
    private authService: AuthenticationService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.userDetails();
    this.getClient();
  }

  getClient() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
      console.log(data);
    });
  }

  createClient(): void {
    this.clientService.addClient(this.client)
      .pipe(
        catchError((error) => {
          console.log('Error when trying to register a new client.');
          throw error;
        })
      ).subscribe((newClient: Client) => {
        console.log('Client successfully registered!');
        this.clients.push(newClient);
        this.client = new Client();
      });
  }

  removeClient(id: number) {
    this.clientService.deleteClient(id)
      .pipe(
        catchError((error) => {
          console.log('Error when trying to remove the client ' + id);
          throw error;
        })
      ).subscribe(() => {
        console.log('Client successfully removed!');
        this.clients = this.clients.filter(client => client.id !== id);
      })
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
