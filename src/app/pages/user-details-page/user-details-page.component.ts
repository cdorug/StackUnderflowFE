import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from "../../user/user.service";
import { User } from "../../user/user";

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss']
})
export class UserDetailsPageComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUser();
    if(this.user === undefined) {
      console.log("undefined user\n");
    }
  }

  getUser(): void {
    // @ts-ignore
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => (this.user = user) );

  }

}
