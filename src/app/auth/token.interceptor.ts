import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const decodedToken = this.authService.decodeToken(token);
      const isExpired = decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;

      if (isExpired) {
        localStorage.removeItem('jwtToken');
        this.router.navigateByUrl('/login').then(() => {
          window.location.reload();
        });
        return throwError(() => new Error("Token expired"));
      }

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.router.navigateByUrl('/login').then(() => {
            console.log('Unauthorized access');
          });
        }
        return throwError(() => error);
      })
    );
  }
}
