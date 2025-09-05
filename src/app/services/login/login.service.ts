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

// ✅ Logout: call backend + clear everything
logout(): Observable<any> {
  return this.http.post(`${this.baseUrl}/logout`, {}, { responseType: 'text', withCredentials: true })
    .pipe(
      tap(() => {
        // Clear tokens
        localStorage.clear();
        sessionStorage.clear();

        // Delete all non-HttpOnly cookies accessible from JS
        this.clearAllCookies();
      })
    );
}

// Utility to clear cookies that JS can access
private clearAllCookies() {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}



  // Google login (redirect to backend OAuth)
  loginWithGoogle(): void {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}
