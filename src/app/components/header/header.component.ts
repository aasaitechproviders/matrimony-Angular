import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userName: string | null = null;
  constructor(private loginService: LoginService, private router: Router) {}

  // check if token exists
  isAuthenticated(): boolean {
    return !!this.loginService.getToken();
  }

  // logout function
  logout(): void {
    this.loginService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.router.navigate(['/login']); // even if server fails, clear client token
      }
    });
  }
}