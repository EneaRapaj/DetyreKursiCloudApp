import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUserService } from '../service/register-user.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  editForm!: FormGroup;
  userId!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: RegisterUserService
  ) {}

  ngOnInit(): void {
    // Marr ID-në nga URL
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUserData();

    // Inicion formën
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      atesi: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.pattern('^\\+355\\d{9}$')]],
      password: ['', [Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!?])(?=\\S+$).{8,}$')]],
      dateOfBirth: ['', Validators.required],
    });
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe((user: Users) => {
      this.editForm.patchValue({
        name: user.name,
        atesi: user.atesi,
        surname: user.surname,
        email: user.email,
        phonenumber: user.phonenumber,
        dateOfBirth: user.dateOfBirth,
      });
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updateData = { ...this.editForm.value };

      // Nëse fusha e password-it është bosh, e heqim nga të dhënat që do dërgohen
      if (!updateData.password) {
        delete updateData.password;
      }

      this.userService.updateUser(this.userId, updateData).subscribe({
        next: () => {
          alert('User updated successfully');
          this.router.navigate(['/admin']);
        },
        error: (err) => alert(`Error: ${err.message}`),
      });
    }
  }

  cancel(): void {
    // /
    this.router.navigate(['/admin']);
  }
}
