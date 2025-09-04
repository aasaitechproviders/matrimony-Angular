import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  // ✅ Login
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  // ✅ Signup
  signup(email: string, phone: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, { email, phone, password });
  }

  // ✅ Google OAuth redirect
  loginWithGoogle(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  // ✅ Token handling
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
