import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  model = new User();

  constructor(public userService: UserService,  private router: Router ) { }

  ngOnInit() {
    this.userService.logout();
  }

  logUser() {
    this.userService.createUser(this.model).subscribe(data => {
      this.router.navigate(['/tasks']);
    }, error => {
      console.log('An error occured: ', error);
    });
  }

}
