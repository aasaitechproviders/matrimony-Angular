import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/auth';  // Spring Boot backend URL

  constructor(private http: HttpClient) { }

  // Login API
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  // Save JWT token
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Get JWT token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

// ✅ Logout: call backend + clear token
logout(): Observable<any> {
  return this.http.post(`${this.baseUrl}/logout`, {}, { responseType: 'text' })
    .pipe(
      tap(() => {
        localStorage.removeItem('token'); // clear after server confirms
      })
    );
}


  // Google login (redirect to backend OAuth)
  loginWithGoogle(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}
