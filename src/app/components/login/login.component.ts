import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // 👇 Capture token after Google redirect
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        console.log("token = "+ token)
        this.loginService.saveToken(token);
        alert('Google Login Success!');
        this.router.navigate(['/profile']); // redirect to profile after Google login
      }
    });
  }

  // ✅ Normal Email/Password Login
  onLogin() {
    this.loginService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.loginService.saveToken(res.token);
        alert('Login success!');
        this.router.navigate(['/profile']); // redirect to profile page
      },
      error: () => alert('Invalid credentials')
    });
  }

  // ✅ Google Login
  loginWithGoogle() {
    this.loginService.loginWithGoogle();
  }
}
