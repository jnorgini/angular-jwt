import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/Login';
import { Register } from '../models/Register';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtAuth } from '../models/JwtAuth';
import { User } from '../models/User';
import { jwtDecode } from 'jwt-decode';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  API_URL = environment.API_URL;
  REGISTER_URL = `${this.API_URL}/users`;
  LOGIN_URL = `${this.API_URL}/login`;
  USER_URL = `${this.API_URL}/users/me`;

  constructor(private http: HttpClient) { }

  register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${this.REGISTER_URL}`, user, HTTP_OPTIONS);
  }

  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${this.LOGIN_URL}`, user, HTTP_OPTIONS);
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }

  decodeToken(token: string): any {
    return jwtDecode(token);
  }

  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      HTTP_OPTIONS.headers = HTTP_OPTIONS.headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<User>(`${this.USER_URL}`, HTTP_OPTIONS);
  }

}
