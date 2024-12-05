import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from '../interfaces/users';
import { RegisterUserService } from '../service/register-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  userForm: FormGroup;
  userId: number;
  userData: Users | null = null;

  constructor(
    private fb: FormBuilder,
    private usersService: RegisterUserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,20}$/)]],
      atesi: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,20}$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,20}$/)]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\+355\d{9}$/)]],
      dateOfBirth: ['', Validators.required], // Kontrollohet si datë nga Angular Material ose input-type="date"
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      role: ['ROLE_USER']
    });
    
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.usersService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.userData = data;
        if (this.userData) {
          this.userForm.patchValue({ ...this.userData, password: '' });
        }
      },
      error: (err) => {
        this.snackBar.open('Error fetching user data.', 'Close', { duration: 3000 });
      },
    });
  }

  updateProfile() {
    if (this.userForm.valid) {
      const updatedUser: Users = { ...this.userForm.value };
      if (!updatedUser.password) {
        delete updatedUser.password;
      }
      this.usersService.updateUser(this.userId, updatedUser).subscribe({
        next: () => this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 }),
        error: () => this.snackBar.open('Error updating profile.', 'Close', { duration: 3000 }),
      });
    }
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
