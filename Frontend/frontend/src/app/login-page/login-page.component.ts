import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserService } from '../service/register-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage = '';

  constructor(
    
    private router: Router,
    private authService: RegisterUserService
  ) {
    
  }

  login() {
    this.authService.loginUser(this.credentials).subscribe({
      next: (response) => {
        const userId = response.userId; // Extract userId from the response
        if (this.credentials.email.endsWith('@admin.com')) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user-page', userId]); // Navigate with the userId
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      },
    });
  }
  
}
