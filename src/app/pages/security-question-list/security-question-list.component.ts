/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 20 Oct 2020
Description: security-question-list-component
============================================
*/
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { SecurityQuestionService } from '../../shared/security-question.service';
import { SecurityQuestion } from '../../shared/security-question.interface';
import { DeleteRecordDialogComponent } from 'src/app/shared/delete-record-dialog/delete-record-dialog.component';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {

  securityQuestions: SecurityQuestion[];
  displayedColumns: string[] = ['question', 'functions']

  //constructor(private http: HttpClient, private securityQuestionService: SecurityQuestionService) {

  constructor(private http: HttpClient, private securityQuestionService: SecurityQuestionService, private dialog: MatDialog) {
    this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res['data'];
      console.log('These are the security questions', JSON.stringify(this.securityQuestions))
    }, err => {
      console.log(err);
    })
   }

  ngOnInit() {
  }

  delete(recordId: string, question: string, ) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete security question, "${question}" ?`
      },
      disableClose: true,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.securityQuestionService.deleteSecurityQuestion(recordId).subscribe(res => {
          console.log('Security question deleted');
          this.securityQuestions = this.securityQuestions.filter(q => q._id !== recordId);
        })
      }
    })
  }

}
