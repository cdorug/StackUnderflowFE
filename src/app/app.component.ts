import { Component } from '@angular/core';
import {User} from "./user/user";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StackUnderflow';

  constructor(private http: HttpClient) {}

  ngOnInit() {

  }

  getUsers() {
    return this.http.get<any>('http://localhost:8080/stackoverflow/users/getAllUsers');
  }

}
