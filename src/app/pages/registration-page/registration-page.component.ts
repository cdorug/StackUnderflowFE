import { Component } from '@angular/core';
import {Question} from "../../question/question";
import {Tag} from "../../question/tag";
import {User} from "../../user/user";
import {UserService} from "../../user/user.service";
import {Router} from "@angular/router";
import * as CryptoJS from "crypto-js";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
  username: string;
  fullname: string;
  password: string;
  email: string;
  location: string;
  imageLink: string;

  constructor(private userService: UserService,
              private router: Router)
  {}

  encryptStringWithSHA256(input: string): string {
    const encrypted = CryptoJS.SHA256(input).toString();
    return encrypted;
  }

  signUp() {
    let user = new User();
    user.username = this.username;
    let nameParts: string[] = this.fullname.split(" ");
    user.firstName = nameParts[0];
    user.lastName = nameParts[1];
    user.email = this.email;
    let encryptedPassword = this.encryptStringWithSHA256(this.password)
    user.password = encryptedPassword;
    user.profilePicture = this.imageLink;
    console.log(user.profilePicture);
    user.score = 0;
    user.location = this.location;
    user.role = 'user';

    this.userService.createUser(user).subscribe(() => {
      console.log("User registered successfully.");
      //this.router.navigate(['/login']);
    }, (error) => {
      console.error("Error registering user:", error);
    });
  }

}
