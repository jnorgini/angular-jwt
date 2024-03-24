import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

const URL = `${environment.API_URL}/clients`;

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(URL);
  }

  getClient(id: number): Observable<Client> {
    const url = `${URL}/${id}`;
    return this.http.get<Client>(url);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(URL, client);
  }

  updateClient(id: number, client: Client): Observable<Client> {
    const url = `${URL}/${id}`;
    return this.http.put<Client>(url, client);
  }

  deleteClient(id: number): Observable<any> {
    const url = `${URL}/${id}`;
    return this.http.delete(url);
  }

}
