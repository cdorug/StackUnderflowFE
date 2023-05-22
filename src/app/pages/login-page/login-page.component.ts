import { Component } from '@angular/core';
import {AuthService} from "../../authentication/auth.service";
import {Router} from "@angular/router";
import * as CryptoJS from 'crypto-js';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  username: string;
  password: string = "nothing";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  encryptStringWithSHA256(input: string): string {
    const encrypted = CryptoJS.SHA256(input).toString();
    return encrypted;
  }

  login(): void {
    let encryptedPassword = this.encryptStringWithSHA256(this.password);
    this.authService.login(this.username, encryptedPassword).subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => {
          console.log(error);
      }
    );
  }


}
