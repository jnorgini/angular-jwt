import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrl: './client-dialog.component.css'
})
export class ClientDialogComponent implements OnInit {
  client = new Client();
  validation = false;
  passwordVisible = false;
  confirmPasswordVisible = false;
  nameFocused = false;
  emailFocused = false;
  cpfFocused = false;
  phoneFocused = false;
  editMode = false;

  @Output() clientUpdated: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initializeClient();
  }

  initializeClient() {
    if (this.data && this.data.id !== 0) {
      this.client = this.data;
      this.editMode = true;
    }
  }

  createClient() {
    this.validation = true;
    if (!this.validateFields()) {
      return;
    }
    this.clientService.addClient(this.client).pipe(
      catchError((error) => {
        console.log('Failed to create client.');
        throw error;
      })
    ).subscribe(() => {
      console.log('Client created successfully!');
      this.client = new Client();
      this.validation = false;
    })
  }

  updateClient(client: Client) {
    this.validation = true;
    if (!this.validateFields()) {
      return;
    }
    this.clientService.updateClient(client).pipe(
      catchError((error) => {
        console.log('Failed to update client.');
        throw error;
      })
    ).subscribe((updatedClient: Client) => {
      console.log('Client updated successfully!');
      this.client = new Client();
      this.validation = false;
      this.clientUpdated.emit(updatedClient);
    });
  }

  validateFields(): boolean {
    const { name, email, cpf, phone } = this.client;

    if (!name || !email || !cpf || !phone) {
      console.log('Por favor, preencha todos os campos.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Por favor, insira um endereço de email válido.');
      return false;
    }
    return true;
  }

  togglePasswordVisibility(passwordInput: HTMLInputElement): void {
    this.passwordVisible = !this.passwordVisible;
    passwordInput.type = this.passwordVisible ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility(confirmPasswordInput: HTMLInputElement): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
    confirmPasswordInput.type = this.confirmPasswordVisible ? 'text' : 'password';
  }

  hasText(inputValue: string): boolean {
    return !!inputValue;
  }

  close() {
    this.dialog.closeAll();
  }

}

