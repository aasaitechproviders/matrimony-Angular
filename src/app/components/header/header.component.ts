import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;

  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('name');
  }

  isAuthenticated(): boolean {
    return !!this.loginService.getToken();
  }

  logout(): void {
    this.loginService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: () => {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    });
  }

  preference(): void {
    this.router.navigate(['/preferences']);
  }

  profile(): void {
    this.router.navigate(['/profile']);
  }

  match(): void {
    this.router.navigate(['/match']);
  }

  search(): void {
    this.router.navigate(['/search']);
  }

  chat(): void {
    this.router.navigate(['/chat']);
  }

  interest(): void {
    this.router.navigate(['/interest']);
  }
}
