import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { RegisterUserService } from '../service/register-user.service'; 


import { Users } from '../interfaces/users';  // Interface for user profile



@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  registerForm: FormGroup;
  showRoleField = false; // Set to true if you want to display the field


  constructor(private fb: FormBuilder, private registerService: RegisterUserService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      atesi: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      surname: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\+355[0-9]{9}$/)]],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/)]],
      role: ['ROLE_USER']
    });
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const userProfile: Users = this.registerForm.value;
      console.log('Form Data:', userProfile);  // Check if dateOfBirth is populated
      this.registerService.registerUser(userProfile).subscribe({
        next: (response: any) => {
          console.log('Response:', response);
          if (typeof response === 'string') {
            alert(response); // Display the plain text response directly
          } else if (response.error) {
            console.error('Error from server:', response.error);
            alert('Registration failed due to server error');
          } else {
            alert('User registered successfully');
          }
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Registration failed');
        }
      });
      
      
    }
  }
  
}
