import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RegisterUserService } from '../service/register-user.service';
import { Users } from '../interfaces/users';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'phonenumber', 'atesi','dateOfBirth', 'actions'];
  dataSource = new MatTableDataSource<Users>();


  constructor(private router: Router, private registerUserService: RegisterUserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.registerUserService.getAllUsers().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  editUser(user: Users): void {
    // Open dialog or navigate to edit page
    // Example: Open a dialog for editing user

    this.router.navigate([`/admin/edit/${user.id}`]);
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.registerUserService.deleteUser(id).subscribe(() => {
        alert('User deleted successfully');
        this.fetchUsers();
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
