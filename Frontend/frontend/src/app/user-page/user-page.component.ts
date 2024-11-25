import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';
import { Users } from '../interfaces/users';
import { RegisterUserService } from '../service/register-user.service';
import { AuthServiceService } from '../service/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';








@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit  {

  userForm: FormGroup;
  userId: number;
  userData: Users | null = null;

  showRoleField = false; // Set to true if you want to display the field

  constructor(
    private fb: FormBuilder,
    private usersService: RegisterUserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    console.log('Resolved User ID:', this.userId);
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      atesi: ['', Validators.required],
      surname: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\+355\d{9}$/)]],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // Optional, add conditional validators in submit logic
      role: ['ROLE_USER'],
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.usersService.getUserById(this.userId).subscribe({
      next: (data) => {
        console.log('Fetched User Data:', data); // Debugging log
        this.userData = data;
        if (this.userData) {
          this.userForm.patchValue(this.userData);
        }
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }
  
  
  

  updateProfile() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value as Users;

      this.usersService.updateUser(this.userId, updatedUser).subscribe({
        next: () => {
          alert('Profile updated successfully');
        },
        error: () => {
          alert('Error updating profile. Please try again.');
        },
      });
    }
  }

  logout(): void {
    // Clear authentication data (if any) from local storage or session storage
    localStorage.removeItem('authToken');  // or sessionStorage.removeItem('authToken')

    // Redirect to the login page, and replace the current URL in the history stack
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
