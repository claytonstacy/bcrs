/*
============================================
Title: BCRS
Author: Clayton Stacy, Christine Bohnet, Jeff Shepherd
Date: 31 Oct 2020
Description: user profile component ts file
============================================
*/

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient,
    private fb: FormBuilder, private router: Router,
    private userService: UserService, private cookieService: CookieService) {

        this.userId = this.cookieService.get('session_id');
        console.log("User ID: " + this.userId);

        this.userService.findUserById(this.userId).subscribe(res => {
          this.user = res.data;
        }, err => {
          this.router.navigate(['/signin']);
          console.log(err);
        }, () => {
          this.form.controls.firstName.setValue(this.user.firstName);
          this.form.controls.lastName.setValue(this.user.lastName);
          this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
          this.form.controls.address.setValue(this.user.address);
          this.form.controls.email.setValue(this.user.email);
        });
       }
       ngOnInit(): void {
        const numberPattern = '^[0-9]*$';

        this.form = this.fb.group({
          firstName: [null, Validators.compose([Validators.required])],

          lastName: [null, Validators.compose([Validators.required])],

          phoneNumber: [null, Validators.compose([Validators.required,
            Validators.pattern(numberPattern), Validators.minLength(10),
            Validators.maxLength(10)])],

          address: [null, Validators.compose([Validators.required])],

          email: [null, Validators.compose([Validators.required,
            Validators.email])]
        });
      }

      saveUser(): void {
          // The 'as' keyword tells TypeScript to ignore type inference and consider,
          // in this case, an empty object named 'newUser' as an object of type User
          const updatedUser = {} as User;

          updatedUser.firstName = this.form.controls.firstName.value;
          updatedUser.lastName = this.form.controls.lastName.value;
          updatedUser.phoneNumber = this.form.controls.phoneNumber.value;
          updatedUser.address = this.form.controls.address.value;
          updatedUser.email = this.form.controls.email.value;

          this.userService.updateUser(this.userId, updatedUser).subscribe(() => {
            this.router.navigate(['/users']);
          }, err => {
            console.log(err);
          });
        }

      cancel(): void {
        this.router.navigate(['/']);
      }
    }
