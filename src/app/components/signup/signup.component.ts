import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SignupService } from '../../services/signup/signup.service';

import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email = '';
  phone = '';
  password = '';

  constructor(private http: HttpClient, private signupService: SignupService,private router: Router) {}

 // ✅ Normal Signup
 onSignup() {
  this.signupService.signup(this.email, this.phone, this.password).subscribe({
    next: (res: any) => {
      alert('Signup successful!');
      if (res.jwt) {
        this.signupService.saveToken(res.token); // auto-login if JWT returned
      }
      this.router.navigate(['/profile']); // redirect to profile page
    },
    error: () => alert('Signup failed!')
  });
}


// Google Signup
signupWithGoogle() {
  this.signupService.loginWithGoogle();
}
}
