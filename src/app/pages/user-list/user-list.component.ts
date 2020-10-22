import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: [User]

  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.findAllUsers().subscribe(res => {
      this.users = res['data'];
      console.log(JSON.stringify(this.users));
    }, err => {
      console.log(err)
    });
   }

  ngOnInit(): void {
  }

}
