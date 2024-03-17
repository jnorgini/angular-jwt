import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/Login';
import { Register } from '../models/Register';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtAuth } from '../models/JwtAuth';
import { User } from '../models/User';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "users";
  loginUrl = "login";
  meUrl = "users/me";

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
   }

  register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${environment.API_URL}/${this.registerUrl}`, user, HTTP_OPTIONS);
  }

  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(`${environment.API_URL}/${this.loginUrl}`, user, HTTP_OPTIONS);
  }

  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      HTTP_OPTIONS.headers = HTTP_OPTIONS.headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<User>(`${environment.API_URL}/${this.meUrl}`, HTTP_OPTIONS);
  }

}
