import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = 'https://fakestoreapi.com/auth';
  token = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap(res => {
          this.token.set(res.token);
          localStorage.setItem('jwt_token', res.token); // caching token
        })
      );
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('jwt_token');
  }

  getToken() {
    return this.token() ?? localStorage.getItem('jwt_token');
  }


}
