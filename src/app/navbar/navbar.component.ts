import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "../authentication/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnChanges{
  showMenu: boolean = false;

  isLoggedIn: boolean = true;

  showOrHideMenu(){
    this.showMenu = !this.showMenu;
  }

  constructor(private authService: AuthService) {}

  onLogout(){
    this.authService.logout();
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngOnChanges() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

}
