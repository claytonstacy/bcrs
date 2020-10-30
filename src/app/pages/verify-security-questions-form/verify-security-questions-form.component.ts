/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 29 Oct 2020
Description: signin component ts file
============================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SelectedSecurityQuestions } from 'src/app/shared/selectedSecurityQuestions.interface';
/*
export interface selectedSecurityQuestions {
  questionText: string;
  answerText: string;
}
*/
@Component({
	selector: 'app-verify-security-questions-form',
	templateUrl: './verify-security-questions-form.component.html',
	styleUrls: ['./verify-security-questions-form.component.css']
})
export class VerifySecurityQuestionsFormComponent implements OnInit {
	selectedSecurityQuestions: SelectedSecurityQuestions;  //TODO create a new interface
	question1: string;
	question2: string;
	question3: string;
	username: string;
	form: FormGroup;

	constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    this.username = this.route.snapshot.queryParamMap.get('username');
    console.log(this.username);

		this.http.get('/api/users/' + this.username + '/security-questions').subscribe(res => {
			this.selectedSecurityQuestions = res['data'];
      console.log(this.selectedSecurityQuestions);
      console.log(res);
		}, err => {
			console.log(err);
		}, () => {

				this.question1 = this.selectedSecurityQuestions[0].questionText,
				this.question2 = this.selectedSecurityQuestions[1].questionText,
				this.question3 = this.selectedSecurityQuestions[2].questionText

				console.log(this.question1);
				console.log(this.question2);
				console.log(this.question3);

		});
	}

	ngOnInit() {
		this.form = this.fb.group({
			answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
			answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
			answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
		});
	}

	verifySecurityQuestions() {
    const answerToSecurityQuestion1 = this.form.controls['answerToSecurityQuestion1'].value;
		const answerToSecurityQuestion2 = this.form.controls['answerToSecurityQuestion2'].value;
		const answerToSecurityQuestion3 = this.form.controls['answerToSecurityQuestion3'].value;

    console.log(answerToSecurityQuestion1 + " " + answerToSecurityQuestion2 + " " + answerToSecurityQuestion3)

    this.http.post('/api/session/verify/users/' + this.username + '/security-questions', {
      questionText1: this.question1,
      questionText2: this.question2,
      questionText3: this.question3,
      answerText1: answerToSecurityQuestion1,
			answerText2: answerToSecurityQuestion2,
			answerText3: answerToSecurityQuestion3
		}).subscribe(res => {

			if (res['message'] == 'success') {
    		this.router.navigate(['/session/reset-password'], { queryParams: { username: this.username }, skipLocationChange: true });

      } else {
        //this.errorText = 'Unable to verify security question answers';
				console.log('Unable to verify security question answers');
			}
		});
	}
}
