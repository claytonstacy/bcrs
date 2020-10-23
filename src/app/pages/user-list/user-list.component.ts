/******************************************************************************
 * Title: user-details.component.ts
 * Author: Jeff Shepherd, Clayton Stacy, Chris Bohnet
 * Modified by:
 * Date: 10/23/2020
 * Description: user list component
 *****************************************************************************/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.interface';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  displayedColumns: string[] = ['userName', 'firstName', 'lastName', 'phoneNumber',
    'address', 'email', 'functions'];

  constructor(private http: HttpClient, private dialog: MatDialog,
    private userService: UserService) {

    this.userService.findAllUsers().subscribe(res => {
      this.users = res['data'];
      console.log(JSON.stringify(this.users));
    }, err => {
      console.log(err)
    });
   }

  ngOnInit(): void {
  }

  delete(userId, recordId) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete user ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe( result => {
      if (result === 'confirm') {
        this.userService.deleteUser(userId).subscribe( res => {
          console.log('User delete');
          // The following returns a new array of users that do not
          // match the id of the deleted user
          this.users = this.users.filter(u => u._id !== userId);
        })
      }
    });
  }

}
