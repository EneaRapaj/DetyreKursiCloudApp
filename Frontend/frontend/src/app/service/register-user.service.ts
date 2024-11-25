import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {
  private apiUrl = 'http://localhost:9998'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Register a user (POST request)
  registerUser(userData: Users): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/register`, userData, { responseType: 'text' as 'json' });
  }

 // Login user (POST request)
//  loginUser(credentials: { email: string, password: string }): Observable<string> {
//   return this.http.post<string>(`${this.apiUrl}/login`, credentials, { responseType: 'text' as 'json' });
// }

loginUser(credentials: { email: string, password: string }): Observable<{ message: string, userId: number }> {
  return this.http.post<{ message: string, userId: number }>(
    `${this.apiUrl}/login`, 
    credentials
  );
}


//--------------------------------------------------------------------------------------------------
getUserProfile(id: number): Observable<Users> {
  return this.http.get<Users>(`${this.apiUrl}/profile/${id}`);
}

updateUserProfile(id: number, profileData: Users): Observable<any> {
  return this.http.put(`${this.apiUrl}/profile/${id}`, profileData, { responseType: 'text' });
}
//Keto jane per te hequr

//------------------------------------------------------------------------------------------------------

getAllUsers(): Observable<Users[]> {
  return this.http.get<Users[]>(`${this.apiUrl}/users`);
}

deleteUser(id: number): Observable<string> {
  return this.http.delete<string>(`${this.apiUrl}/profile/${id}`,{ responseType: 'text' as 'json' });
}


updateUser(id: number, user: Users): Observable<any> {
  return this.http.put(`${this.apiUrl}/profile/${id}`, user, { responseType: 'text' });
}

getUserById(id: number): Observable<Users> {
  return this.http.get<Users>(`${this.apiUrl}/profile/${id}`);
}
}
