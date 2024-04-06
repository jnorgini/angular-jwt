import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthenticationService } from '../../services/authentication.service';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // currentUser: User | null = null;
  // currentUserVisible: boolean = false;
  client = new Client();
  clients: Client[] = [];
  validation = false;
  nameFocused = false;
  emailFocused = false;
  cpfFocused = false;
  phoneFocused = false;
  searchQuery: string = '';

  constructor(private authService: AuthenticationService, private clientService: ClientService) { }

  ngOnInit(): void {
    // this.userDetails();
    this.getClient();
  }

  getClient() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
      console.log(data);
    });
  }

  isEmailValid(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  createClient(): void {
    this.validation = true;
    if (!this.client.name || !this.client.email || !this.client.cpf || !this.client.phone) {
      console.log('Por favor, preencha todos os campos');
      return;
    }
    if (!this.isEmailValid(this.client.email)) {
      console.log('Por favor, insira um email válido');
      return;
    }
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
        this.validation = false;
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

  // toggleUserDetails(): void {
  //   this.currentUserVisible = !this.currentUserVisible;
  // }

  // userDetails(): void {
  //   this.authService.getCurrentUser().subscribe(user => {
  //     this.currentUser = user;
  //   });
  // }

  hasText(inputValue: string): boolean {
    return !!inputValue;
  }

  filterClients(searchQuery: string): void {
    if (!searchQuery.trim()) {
      this.getClient();
    } else {
      this.clients = this.clients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }

}
