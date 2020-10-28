/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 20 Oct 2020
Description: security-question-details-component
============================================
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestion } from 'src/app/shared/security-question.interface';
import {SecurityQuestionService} from 'src/app/shared/security-question.service';

@Component({
  selector: 'app-security-question-details',
  templateUrl: './security-question-details.component.html',
  styleUrls: ['./security-question-details.component.css']
})
export class SecurityQuestionDetailsComponent implements OnInit {
  question: SecurityQuestion;
	questionId: string;
	form: FormGroup;

	constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private securityQuestionService: SecurityQuestionService) {
		this.questionId = this.route.snapshot.paramMap.get('questionId');
    this.securityQuestionService.findSecurityQuestionById(this.questionId).subscribe(res => {
			this.question = res['data'];
		}, err => {
			console.log(err);
		}, () => {
			this.form.controls.text.setValue(this.question.text);
		})
	}

	ngOnInit() {
		this.form = this.fb.group({
			text: [null, Validators.compose([Validators.required])]
		});
	}

	saveQuestion() {
    const updateSecurityQuestion = {} as SecurityQuestion;
    updateSecurityQuestion.text = this.form.controls.text.value;

	  this.securityQuestionService.updateSecurityQuestion(this.questionId, updateSecurityQuestion).subscribe(res => {
			this.router.navigate(['/security-questions']);
    }, err => {
      console.log(err);
		})
	}

	//Cancels and routes back to security questions page
	cancel() {
		this.router.navigate(['/security-questions']);
	}

}
