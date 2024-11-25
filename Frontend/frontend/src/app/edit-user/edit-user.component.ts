import { Component, OnInit  } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUserService } from '../service/register-user.service';

import { Users } from '../interfaces/users';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editForm!: FormGroup;
  userId!: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: RegisterUserService

  ) {}

  editUser(user: Users): void {
    // Navigate to the edit user page with the user ID
    this.router.navigate([`/admin/edit/${user.id}`]);
  }
   
  ngOnInit(): void {
    // Get the user ID from the route
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUserData();

  // Create the form
  this.editForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
    atesi: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
    surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
    email: ['', [Validators.required, Validators.pattern('^(?!.*?@[\\w.]+(?:\\.[a-zA-Z]{2,}){2,})(?:[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*(?:\\.[a-zA-Z]{2,7}))$')]],
    phonenumber: ['', [Validators.required, Validators.pattern('^\\+355\\d{9}$')]],
    password: ['', [Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!?])(?=\\S+$).{8,}$')]], // Optional password field
    dateOfBirth: ['', [Validators.required]],
  });
  }

  loadUserData(): void {
    // Fetch user data by ID and populate the form
    this.userService.getUserById(this.userId).subscribe((user: Users) => {
      this.editForm.patchValue(user);
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.userService.updateUser(this.userId, this.editForm.value).subscribe({
        next: () => {
          alert('User updated successfully');
          this.router.navigate(['/admin']);
        },
        error: (err) => alert(`Error: ${err.message}`)
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}