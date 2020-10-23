/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 20 Oct 2020
Description: security-question-create-component
============================================
*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SecurityQuestion } from 'src/app/shared/security-question.interface';
import {SecurityQuestionService} from 'src/app/shared/security-question.service';

@Component({
  selector: 'app-security-question-create',
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
})
export class SecurityQuestionCreateComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private securityQuestionService: SecurityQuestionService) { }
	form: FormGroup;
	ngOnInit() {
		this.form = this.fb.group({
			text: [null, Validators.compose([Validators.required])]
		});
	}

	// Create
	create() {
		const newSecurityQuestion = {} as SecurityQuestion;
    newSecurityQuestion.text = this.form.controls.text.value;

	  this.securityQuestionService.createSecurityQuestion(newSecurityQuestion).subscribe(res => {
      this.router.navigate(['/security-questions']);
    }, err => {
      console.log(err);
		})
	}

	// Cancel
	cancel() {
		this.router.navigate(['/security-questions']);
	}

}
