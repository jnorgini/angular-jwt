import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { catchError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog/confirmation-dialog.component';
import { ClientDialogComponent } from '../../dialogs/client-dialog/client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  client = new Client();
  clients: Client[] = [];
  validation = false;
  searchQuery: string = '';

  constructor(
    private clientService: ClientService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientService.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  openCreateClient() {
    this.dialog.open(ClientDialogComponent, {
      closeOnNavigation: true,
      data: new Client()
    })
      .afterClosed().subscribe(() => {
        this.getClients();
      });
  }

  openEditClient(userId: number) {
    const client = this.clients.find(client => client.id === userId);
    if (client) {
      const dialogRef = this.dialog.open(ClientDialogComponent, {
        closeOnNavigation: true,
        data: Object.assign({}, client)
      });

      dialogRef.componentInstance.clientUpdated.subscribe((updatedClient: Client) => {
        const index = this.clients.findIndex(u => u.id === updatedClient.id);
        if (index !== -1) {
          this.clients[index] = updatedClient;
        }
      });
    } else {
      console.error('User not found');
    }
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

  openConfirmation(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      closeOnNavigation: true,
      data: 'The client will be removed permanently.'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.removeClient(id);
      }
    });
  }

  hasText(inputValue: string): boolean {
    return !!inputValue;
  }

  filterClients(searchQuery: string): void {
    if (!searchQuery.trim()) {
      this.getClients();
    } else {
      this.clients = this.clients.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }

}
