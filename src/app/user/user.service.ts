import { Injectable } from '@angular/core';
import { User } from "./user";
import { Observable, of } from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Question} from "../question/question";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/stackoverflow/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getAllUsers`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getUserById/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/createUser`, user)
  }

  getUserByUsername(username: string | null): Observable<User> {
    // @ts-ignore
    let params = new HttpParams().set('username', username);
    return this.http.get<User>(`${this.baseUrl}/getUserByUsername`, { params });
  }

  banUser(user: User) {
    return this.http.put<User>(`${this.baseUrl}/banUser`, user);
  }

  unbanUser(user: User) {
    return this.http.put<User>(`${this.baseUrl}/unbanUser`, user);
  }
}
