import {Component, OnInit} from '@angular/core';
import { User } from "../../user/user";
import { UserService } from "../../user/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  users: User[];
  selectedUser: User;
  currentUser: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
    let loggedInUsername = localStorage.getItem('currentUser');
    this.userService.getUserByUsername(loggedInUsername).subscribe( user => {
        this.currentUser = user
        console.log(user.role)
      }
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(users => (this.users = users));
  }

  onSelect(user: User) {
    this.selectedUser = user;
  }

  banUser(user: User) {
    this.userService.banUser(user).subscribe(() => {
      console.log("User banned successfully");
      this.getUsers();
    }, (error) => {
      console.error("Error banning user:", error);
    });
  }

  unbanUser(user: User) {
    this.userService.unbanUser(user).subscribe(() => {
      console.log("User unbanned successfully");
      this.getUsers();
    }, (error) => {
      console.error("Error unbanning user:", error);
    });
  }

}
