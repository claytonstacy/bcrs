/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd, Verlee Washington
Date: 20 Oct 2020
Description: Role list component
============================================
*/

import {Component, OnInit} from '@angular/core';
import {DeleteRecordDialogComponent} from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {RoleService} from '../../shared/services/role.service';
import {Role} from '../../shared/interfaces/role.interface';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roles: Role[];
  displayedColumns = ['role', 'functions'];
  error: string;

  constructor(private http: HttpClient, private roleService: RoleService, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.http.get('/api/roles').subscribe(res => {
      this.roles = res['data'];
      console.log(this.roles);
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
  }


  delete(roleId: string, role: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        roleId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete role, "${role}" ?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.roleService.deleteRole(roleId).subscribe(res => {
          console.log('This is the resposne', res)
          if(res.httpCode === '401') {
            this.error = res.message;
            this._snackBar.open(this.error, null,{ duration: 2000 });

          } else {
            this.roles = this.roles.filter(role => role._id !== roleId);
          }
        });
      }
    });
  }
}
