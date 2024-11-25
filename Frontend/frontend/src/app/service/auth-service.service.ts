import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private loggedIn = false;  // This is just a simple example

  constructor() {
    // Check if the user is logged in (e.g., by checking local storage or a JWT token)
    this.loggedIn = !!localStorage.getItem('userToken');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
