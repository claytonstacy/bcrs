/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 29 Oct 2020
Description: verify username form component ts file
============================================
*/

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.css']
})
export class VerifyUsernameFormComponent implements OnInit {
  form: FormGroup;
  error: string;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])]
    });
  }

  validateUsername() {
    const username = this.form.controls['username'].value;

    this.http.get('/api/session/verify/users/' + username).subscribe(res => {
      if (res) {
        this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username}, skipLocationChange: true});
      }
    }, err => {
      this.error = 'Invalid username';
      console.log(err);
    });
  }
}
