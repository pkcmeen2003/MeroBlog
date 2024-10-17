import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root', // Ensures the service is available throughout the application
})
export class UserService {
  private api: string = 'http://localhost:8080/api/users';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.api}/login`, user, this.httpOptions);
  }

  signUp(user: User): Observable<string> {
    return this.http.post<string>(`${this.api}/register`, user, {
      responseType: 'text' as 'json',
    });
  }
}
