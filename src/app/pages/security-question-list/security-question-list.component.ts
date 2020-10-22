import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestionService } from '../../shared/security-question.service';
import { SecurityQuestion } from '../../shared/security-question.interface';

@Component({
  selector: 'app-security-question-list',
  templateUrl: './security-question-list.component.html',
  styleUrls: ['./security-question-list.component.css']
})
export class SecurityQuestionListComponent implements OnInit {

  securityQuestions: [SecurityQuestion];
  displayedColumns: string[] = ['question', 'functions']

  constructor(private http: HttpClient, private securityQuestionService: SecurityQuestionService) {
    this.securityQuestionService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res['data'];
      console.log('These are the security questions', JSON.stringify(this.securityQuestions))
    }, err => {
      console.log(err);
    })
   }

  ngOnInit(): void {
  }

}
