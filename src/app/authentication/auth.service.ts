import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, ReplaySubject, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn : boolean = false;

  get isLoggedIn() {
    return this.loggedIn;
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string): Observable<string> {
    const loginUrl = 'http://localhost:8080/stackoverflow/users/authenticate';
    const requestBody = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.loggedIn = true;
    return this.http.post(loginUrl, requestBody, { headers, responseType: 'text' })
      .pipe(
        map(response => {
          const authToken = response;
          console.log("Received token: " + authToken);
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('currentUser', username);
          localStorage.setItem('loggedIn', 'yes');
          return authToken;
        }),
        catchError(error => {
          if (error.status === 403) {
            // Redirect to a forbidden page or handle the forbidden status as desired
            this.router.navigate(['/banned']);
          }
          const errorMsg = error.status === 401 ? 'Invalid username or password' : 'Something went wrong';
          return throwError(errorMsg);
        })
      );
  }


  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.setItem('loggedIn', "no");
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }

}
